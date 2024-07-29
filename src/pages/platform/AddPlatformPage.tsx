import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import ErrorResponse from "../../model/response/ErrorResponse";
import {addPlatformService} from "../../services/platformService";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import {platformValidationsSchema} from "../../constants/ValidationSchemas";
import {Form, Formik} from "formik";
import EditableTextInput from "../../components/form/EditableTextInput";
import SubmitButton from "../../components/form/SubmitButton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";
import {PlatformRequest} from "../../model/request/platform/PlatformRequest";
import {handleAxiosError} from "../../utils/utils";

const AddPlatformPage = () => {

  const navigate = useNavigate();
  const [apiResponseError, setApiResponseError] = useState<Array<ErrorResponse>>([]);

  const addPlatform = async (platformRequest: PlatformRequest) => {
    try {
      await addPlatformService(platformRequest);

      navigate("/platforms");
    } catch (error: unknown) {
      handleAxiosError(error, setApiResponseError, navigate);
    }
  };

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="text-4xl text-gray-900 text-center my-10">
          Add Platform
        </h1>
        {
          apiResponseError && apiResponseError.length >= 1 &&
          <ErrorListAlert
            title="Error adding platform"
            errors={apiResponseError}/>
        }

        <Formik
          initialValues={{
            name: ''
          }}
          validationSchema={platformValidationsSchema}
          onSubmit={(values, {setSubmitting}) => {
            addPlatform(values).then(() => setSubmitting(false));
          }}>

          {
            ({isSubmitting}) => (
              <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
                <EditableTextInput label="Platform Name"
                                   name="name"
                                   type="text"/>

                {
                  !isSubmitting &&
                  <SubmitButton text="Add platform"/> ||
                  <DisabledSubmitButton text="Adding platform"/>
                }
              </Form>
            )
          }
        </Formik>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default withScrollToTop(AddPlatformPage);