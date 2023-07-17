import React, {useState} from "react";
import {Form, Formik} from "formik";
import EditableTextInput from "../form/EditableTextInput";
import SubmitButton from "../form/SubmitButton";
import {useNavigate} from "react-router-dom";
import ErrorResponse from "../../model/response/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";
import {addGoalValidationSchema} from "../../constants/ValidationSchemas";
import {addGoalService} from "../../services/goalService";

const AddGoalForm = () => {

  const navigate = useNavigate();

  const [apiErrors, setApiErrors] = useState<ErrorResponse[]>([]);

  const addGoal = async ({...values}) => {
    const {cryptoName, goalQuantity} = values;

    try {
      await addGoalService({
        cryptoName,
        quantityGoal: goalQuantity
      });

      navigate("/goals");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiErrors(error.response.data.errors);
      }

      if (status >= 500) {
        navigate("/error");
      }
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        Add Goal
      </h1>

      {
        apiErrors && apiErrors.length >= 1 &&
        <ErrorListAlert
          title="Error adding crypto"
          errors={apiErrors}/>
      }

      <Formik
        initialValues={{
          cryptoName: '',
          goalQuantity: 0
        }}
        validationSchema={addGoalValidationSchema}
        onSubmit={(values, {setSubmitting}) => {
          addGoal(values);
        }}>

        <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
          <EditableTextInput label="Crypto Name"
                             type="text"
                             name="cryptoName"
                             placeholder="Bitcoin"
                             maxLength={64}/>
          <EditableTextInput label="Goal Quantity"
                             type="text"
                             name="goalQuantity"/>
          <SubmitButton text="Add Goal"/>
        </Form>
      </Formik>
    </div>
  );
}

export default AddGoalForm