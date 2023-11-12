import {UUID_REGEX} from "../../constants/Constants";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ErrorResponse from "../../model/response/ErrorResponse";
import {GoalResponse} from "../../model/response/goal/GoalResponse";
import {Form, Formik} from "formik";
import DisabledTextInput from "../form/DisabledTextInput";
import EditableTextInput from "../form/EditableTextInput";
import SubmitButton from "../form/SubmitButton";
import ErrorListAlert from "../page/ErrorListAlert";
import ErrorAlert from "../page/ErrorAlert";
import {updateGoalValidationSchema} from "../../constants/ValidationSchemas";
import {retrieveGoal, updateGoal} from "../../services/goalService";

const UpdateGoalForm = () => {

  const navigate = useNavigate();
  const params = useParams();
  const goalId: string = params.id!!;

  const [goal, setGoal] = useState<GoalResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<Array<ErrorResponse>>([]);
  const [fetchInfoError, setFetchInfoError] = useState(false);
  const [noChangesError, setNoChangesError] = useState(false);

  useEffect(() => {
    (async () => {
        if (UUID_REGEX.test(goalId)) {
          try {
            const goal = await retrieveGoal(goalId);
            setGoal(goal);
          } catch (error: any) {
            setFetchInfoError(true);
          } finally {
            setIsLoading(false);
          }
        } else {
          navigate("/404");
        }
      }
    )();
  }, []);

  const updateGoalQuantity = async ({...values}) => {
    const {cryptoName, goalQuantity} = values;

    if (String(goal?.goalQuantity!) === String(goalQuantity)) {
      setNoChangesError(true);
      return;
    }

    try {
      await updateGoal({
        goalId,
        cryptoName,
        goalQuantity
      });

      navigate("/goals");
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
          `Update ${goal?.cryptoName} Goal`
        }
      </h1>

      {
        apiResponseError && apiResponseError.length >= 1 &&
        <ErrorListAlert
          title="Error updating goal"
          errors={apiResponseError}/>
      }

      {
        fetchInfoError &&
        <ErrorAlert message="Error retrieving goal info"/>
      }

      {
        noChangesError &&
        <ErrorAlert message="No changes were made"/>
      }

      {
        !fetchInfoError && !isLoading &&
        <Formik
          initialValues={{
            cryptoName: goal?.cryptoName ?? '',
            goalQuantity: goal?.goalQuantity ?? 0
          }}
          validationSchema={updateGoalValidationSchema}
          onSubmit={(values, {setSubmitting}) => {
            updateGoalQuantity(values);
          }}>
          <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
            <DisabledTextInput label="Crypto Name"
                               name="cryptoName"
                               type="text"/>
            <EditableTextInput label="Goal Quantity"
                               name="goalQuantity"
                               type="number"/>
            <SubmitButton text="Update Goal"/>
          </Form>
        </Formik>
      }
    </div>
  );
}

export default UpdateGoalForm