import {Form, Formik} from "formik";
import EditableTextInput from "../form/EditableTextInput";
import SubmitButton from "../form/SubmitButton";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ErrorResponse from "../../model/response/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";
import {platformValidationsSchema} from "../../constants/ValidationSchemas";
import {addPlatformService} from "../../services/platformServvice";

const AddPlatformForm = () => {

  const navigate = useNavigate();

  const [apiResponseError, setApiResponseError] = useState<ErrorResponse[]>([]);

  const addPlatform = async ({...values}) => {
    const {platformName} = values;

    try {
      await addPlatformService({platformName});

      navigate("/platforms");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiResponseError(error.response.data.errors);
      }

      if (status >= 500) {
        navigate("/error");
      }
    }
  }

  return (
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
          platformName: ''
        }}
        validationSchema={platformValidationsSchema}
        onSubmit={(values, {setSubmitting}) => {
          addPlatform(values);
        }}>
        <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
          <EditableTextInput label="Platform Name"
                             name="platformName"
                             type="text"/>

          <SubmitButton text="Add platform"/>
        </Form>
      </Formik>
    </div>
  );
}

export default AddPlatformForm