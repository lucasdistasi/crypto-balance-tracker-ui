import React, {useEffect, useState} from "react";
import ErrorResponse from "../../model/response/ErrorResponse";
import {useNavigate, useParams} from "react-router-dom";
import {Form, Formik} from "formik";
import EditableTextInput from "../form/EditableTextInput";
import SubmitButton from "../form/SubmitButton";
import ErrorListAlert from "../page/ErrorListAlert";
import ErrorAlert from "../page/ErrorAlert";
import {platformValidationsSchema} from "../../constants/ValidationSchemas";
import {getPlatformService, updatePlatformService} from "../../services/platformService";
import {PlatformResponse} from "../../model/response/platform/PlatformResponse";

const EditPlatformForm = () => {

  const navigate = useNavigate();
  const params = useParams();
  const platformId: string = params.id!!;

  const [platformResponse, setPlatformResponse] = useState<PlatformResponse>({
    id: "",
    name: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<Array<ErrorResponse>>([]);
  const [fetchInfoError, setFetchInfoError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const response = await getPlatformService(platformId);
          setPlatformResponse(response);
        } catch (err: any) {
          setFetchInfoError(true);
        } finally {
          setIsLoading(false);
        }
      }
    )();
  }, []);

  const updatePlatform = async ({...values}) => {
    const {platformName} = values;

    try {
      await updatePlatformService({platformId, platformName});

      navigate("/platforms");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiResponseError(error.response.data);
      }

      if (status >= 500) {
        navigate("/error");
      }
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        {
          `Update ${platformResponse.name}`
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
        !fetchInfoError && !isLoading &&
        <Formik
          initialValues={{
            platformName: platformResponse.name ?? ''
          }}
          validationSchema={platformValidationsSchema}
          onSubmit={(values, {setSubmitting}) => {
            updatePlatform(values)
          }}>
          <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
            <EditableTextInput label="Platform Name"
                               name="platformName"
                               type="text"/>
            <SubmitButton text="Update platform"/>
          </Form>
        </Formik>
      }
    </div>
  );
}

export default EditPlatformForm