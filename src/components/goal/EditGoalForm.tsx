import {MONGO_ID_REGEX} from "../../constants/Constants";
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
import {getGoalService, updateGoalService} from "../../services/goalService";

const EditGoalForm = () => {

  const navigate = useNavigate();
  const params = useParams();
  const goalId: string = params.id!!;

  const [goal, setGoal] = useState<GoalResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<ErrorResponse[]>([]);
  const [fetchInfoError, setFetchInfoError] = useState(false);
  const [noChangesError, setNoChangesError] = useState(false);

  useEffect(() => {
    (async () => {
        if (MONGO_ID_REGEX.test(goalId)) {
          try {
            const goal = await getGoalService({goalId});
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

  const updateGoal = async ({...values}) => {
    const {goal_quantity} = values;

    if (String(goal?.goal_quantity!) === String(goal_quantity)) {
      setNoChangesError(true);
      return;
    }

    try {
      await updateGoalService({goalId, goal_quantity})

      navigate("/goals");
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
        {
          `Update ${goal?.crypto_name} Goal`
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
            crypto_name: goal?.crypto_name ?? '',
            goal_quantity: goal?.goal_quantity ?? 0
          }}
          validationSchema={updateGoalValidationSchema}
          onSubmit={(values, {setSubmitting}) => {
            updateGoal(values);
          }}>
          <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
            <DisabledTextInput label="Crypto Name"
                               name="crypto_name"
                               type="text"/>
            <EditableTextInput label="Goal Quantity"
                               name="goal_quantity"
                               type="number"/>
            <SubmitButton text="Update Goal"/>
          </Form>
        </Formik>
      }
    </div>
  );
}

export default EditGoalForm