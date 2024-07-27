import React, {Fragment, useState} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import {useNavigate} from "react-router-dom";
import ErrorResponse from "../../model/response/ErrorResponse";
import {saveGoal} from "../../services/goalService";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import {Form, Formik} from "formik";
import {addGoalValidationSchema} from "../../constants/ValidationSchemas";
import EditableTextInput from "../../components/form/EditableTextInput";
import SubmitButton from "../../components/form/SubmitButton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";

const AddGoalPage = () => {

  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState<Array<ErrorResponse>>([]);

  const addGoal = async ({...values}) => {
    const {cryptoName, goalQuantity} = values;

    try {
      await saveGoal({
        cryptoName,
        goalQuantity
      });

      navigate("/goals");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiErrors(error.response.data);
      }

      if (status >= 500) {
        navigate("/error");
      }
    }
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="text-4xl text-gray-900 text-center my-10">
          Add Goal
        </h1>

        {
          apiErrors && apiErrors.length >= 1 &&
          <ErrorListAlert
            title="Error adding goal"
            errors={apiErrors}/>
        }

        <Formik
          initialValues={{
            cryptoName: '',
            goalQuantity: 0
          }}
          validationSchema={addGoalValidationSchema}
          onSubmit={(values, {setSubmitting}) => {
            addGoal(values).then(() => setSubmitting(false));
          }}>

          {
            ({isSubmitting}) => (
              <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
                <EditableTextInput label="Crypto Name"
                                   type="text"
                                   name="cryptoName"
                                   placeholder="Bitcoin"
                                   maxLength={64}/>
                <EditableTextInput label="Goal Quantity"
                                   type="text"
                                   name="goalQuantity"/>

                {
                  !isSubmitting &&
                  <SubmitButton text="Add Goal"/> ||
                  <DisabledSubmitButton text="Adding Goal"/>
                }
              </Form>
            )
          }
        </Formik>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(AddGoalPage)