import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment, useEffect, useState} from "react";
import withScrollToTop from "../../hoc/withScrollToTop";
import {useNavigate, useParams} from "react-router-dom";
import {GoalResponse} from "../../model/response/goal/GoalResponse";
import ErrorResponse from "../../model/response/ErrorResponse";
import {UUID_REGEX} from "../../constants/Constants";
import {retrieveGoal, updateGoal} from "../../services/goalService";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import ErrorAlert from "../../components/page/ErrorAlert";
import {Form, Formik} from "formik";
import {updateGoalValidationSchema} from "../../constants/ValidationSchemas";
import DisabledTextInput from "../../components/form/DisabledTextInput";
import EditableTextInput from "../../components/form/EditableTextInput";
import SubmitButton from "../../components/form/SubmitButton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";
import FormSkeleton from "../../components/skeletons/FormSkeleton";
import axios from "axios";

const UpdateGoalPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const goalId: string = params.id!!;
  const [goal, setGoal] = useState<GoalResponse>();
  const [isLoadingGoal, setIsLoadingGoal] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<Array<ErrorResponse>>([]);
  const [fetchInfoError, setFetchInfoError] = useState(false);
  const [noChangesError, setNoChangesError] = useState(false);

  useEffect(() => {
    (async () => {
        if (UUID_REGEX.test(goalId)) {
          try {
            const goal = await retrieveGoal(goalId);
            setGoal(goal);
          } catch (error: unknown) {
            setFetchInfoError(true);
          } finally {
            setIsLoadingGoal(false);
          }
        } else {
          navigate("/404");
        }
      }
    )();
  }, []);

  const updateGoalQuantity = async (values: {cryptoName: string, goalQuantity: string}) => {
    if (String(goal?.goalQuantity!) === values.goalQuantity) {
      setNoChangesError(true);
      return;
    }

    try {
      await updateGoal(goalId, {
        cryptoName: values.cryptoName,
        goalQuantity: Number(values.goalQuantity)
      });

      navigate("/goals");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status && (status >= 400 && status < 500)) {
          setApiResponseError(error.response?.data);
          return;
        }
      }

      navigate("/error");
    }
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        {
          !isLoadingGoal &&
          <h1 className="text-4xl text-gray-900 text-center my-10">
            {
              `Update ${goal?.cryptoName} Goal`
            }
          </h1>
        }

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
          !fetchInfoError && !isLoadingGoal &&
          <Formik
            initialValues={{
              cryptoName: goal?.cryptoName ?? '',
              goalQuantity: goal?.goalQuantity ?? '0'
            }}
            validationSchema={updateGoalValidationSchema}
            onSubmit={(values, {setSubmitting}) => {
              updateGoalQuantity(values).then(() => setSubmitting(false));
            }}>

            {
              ({isSubmitting}) => (
                <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2" noValidate>
                  <DisabledTextInput label="Crypto Name"
                                     name="cryptoName"
                                     type="text"/>
                  <EditableTextInput label="Goal Quantity"
                                     name="goalQuantity"
                                     type="number"/>
                  {
                    !isSubmitting &&
                    <SubmitButton text="Update Goal"/> ||
                    <DisabledSubmitButton text="Updating Goal"/>
                  }
                </Form>
              )
            }
          </Formik>
        }

        {
          isLoadingGoal &&
          <FormSkeleton items={2}/>
        }
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(UpdateGoalPage)