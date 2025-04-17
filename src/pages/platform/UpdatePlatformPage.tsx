import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {PlatformResponse} from "../../model/response/platform/PlatformResponse";
import ErrorResponse from "../../model/response/ErrorResponse";
import {getPlatformService, updatePlatformService} from "../../services/platformService";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import ErrorAlert from "../../components/page/ErrorAlert";
import {Form, Formik} from "formik";
import {platformValidationsSchema} from "../../constants/ValidationSchemas";
import EditableTextInput from "../../components/form/EditableTextInput";
import SubmitButton from "../../components/form/SubmitButton";
import FormSkeleton from "../../components/skeletons/FormSkeleton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";
import {handleAxiosError} from "../../utils/utils";

const UpdatePlatformPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const platformId: string = params.id!;
  const [platformResponse, setPlatformResponse] = useState<PlatformResponse>({
    id: "",
    name: ""
  });
  const [isLoadingPlatform, setIsLoadingPlatform] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<Array<ErrorResponse>>([]);
  const [fetchInfoError, setFetchInfoError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const response = await getPlatformService(platformId);
          setPlatformResponse(response);
        } catch (error: unknown) {
          setFetchInfoError(true);
        } finally {
          setIsLoadingPlatform(false);
        }
      }
    )();
  }, []);

  const updatePlatform = async (values: {name: string}) => {
    try {
      await updatePlatformService(platformId, {name: values.name});

      navigate("/platforms");
    } catch (error: unknown) {
      handleAxiosError(error, setApiResponseError, navigate);
    }
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="text-4xl text-gray-900 text-center my-10">
          {
            !isLoadingPlatform && `Update ${platformResponse.name}`
          }
        </h1>

        {
          apiResponseError && apiResponseError.length >= 1 &&
          <ErrorListAlert
            title="Error updating platform"
            errors={apiResponseError}/>
        }

        {
          fetchInfoError &&
          <ErrorAlert message="Error retrieving platform info"/>
        }

        {
          !fetchInfoError && !isLoadingPlatform &&
          <Formik
            initialValues={{
              name: platformResponse.name ?? ''
            }}
            validationSchema={platformValidationsSchema}
            onSubmit={(values, {setSubmitting}) => {
              updatePlatform(values).then(() => setSubmitting(false));
            }}>

            {
              ({isSubmitting}) => (
                <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
                  <EditableTextInput label="Platform Name"
                                     name="name"
                                     type="text"/>
                  {
                    !isSubmitting &&
                    <SubmitButton text="Update platform"/> ||
                    <DisabledSubmitButton text="Updating platform"/>
                  }
                </Form>
              )
            }
          </Formik>
        }

        {
          !fetchInfoError && isLoadingPlatform &&
          <FormSkeleton items={1}/>
        }
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(UpdatePlatformPage)