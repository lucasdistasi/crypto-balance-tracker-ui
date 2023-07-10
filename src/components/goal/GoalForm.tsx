import {FORM_ACTION} from "../../model/FormAction";
import React, {useEffect, useState} from "react";
import ActionButton from "../form/ActionButton";
import {GoalRequest} from "../../model/request/goal/GoalRequest";
import axios from "axios";
import {
  getGoalURL,
  GOALS_ENDPOINT,
  isValidQuantity,
  MONGO_ID_REGEX
} from "../../constants/Constants";
import {useNavigate} from "react-router-dom";
import ErrorResponse from "../../model/response/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";
import {GoalResponse} from "../../model/response/goal/GoalResponse";
import ErrorAlert from "../page/ErrorAlert";
import {useCryptoNameHook} from "../../hooks/useCryptoNameHook";

const GoalForm = ({action}: { action: FORM_ACTION }) => {

  const navigate = useNavigate();
  const {
    cryptoName,
    cryptoNameInputError,
    handleCryptoNameChange
  } = useCryptoNameHook()
  const [goal, setGoal] = useState<GoalResponse>();
  const [quantityGoal, setQuantityGoal] = useState("0.0");

  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [quantityInputError, setQuantityInputError] = useState(false);
  const [noChangesError, setNoChangesError] = useState(false);

  useEffect(() => {
    if (action == FORM_ACTION.UPDATE) {
      (async () => {
          const goalId: string = window.location.pathname.split('/').pop() ?? "";

          if (MONGO_ID_REGEX.test(goalId)) {
            const goal = getGoalURL(goalId);

            try {
              const {data} = await axios.get(goal);

              setGoal(data);
              setQuantityGoal(data.goalQuantity)
            } catch (err: any) {
              const {status} = err.response;
              if (status === 400) {
                setErrors(err.response.data.errors);
              }

              redirectToPage(status);
            }
          } else {
            navigate("/404");
          }
        }
      )();
    }
  }, []);

  const redirectToPage = (status: number) => {
    if (status === 404) {
      navigate("/404");
    }

    if (status >= 500) {
      navigate("/error");
    }
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuantityGoal(event.target.value);

    if (isValidQuantity(event.target.value)) {
      setQuantityInputError(false);
    } else {
      setQuantityInputError(true);
    }
  }

  const addGoal = async (goalRequest: GoalRequest) => {
    const {quantityGoal} = goalRequest;
    const isInvalidQuantity = !isValidQuantity(quantityGoal.toString());

    if (isInvalidQuantity) {
      setQuantityInputError(true);
    }

    if (!isInvalidQuantity) {
      try {
        await axios.post(GOALS_ENDPOINT, {
          cryptoName: goalRequest.cryptoName,
          quantityGoal: quantityGoal.toString()
        });
        navigate("/goals");
      } catch (err: any) {
        setErrors(err.response.data.errors);
      }
    }
  }

  const updateGoal = async (quantityGoal: string) => {
    const isInvalidQuantity = !isValidQuantity(quantityGoal);

    if (isInvalidQuantity) {
      setQuantityInputError(true);
    }

    if (goal?.goalQuantity === quantityGoal) {
      setNoChangesError(true);
      return;
    }

    if (!isInvalidQuantity) {
      const goalId: string = window.location.pathname.split('/').pop() ?? "";

      try {
        await axios.put(getGoalURL(goalId), {
          quantityGoal
        });

        navigate("/goals");
      } catch (err: any) {
        setErrors(err.response.data.errors);
      }
    }

  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        {
          action == FORM_ACTION.ADD && "Add Goal"
        }
        {
          action == FORM_ACTION.UPDATE && `Edit ${goal?.cryptoName} Goal`
        }
      </h1>

      {
        noChangesError &&
        <ErrorAlert message="No changes were made"/>
      }

      {
        errors.length >= 1 &&
        <ErrorListAlert
          title={action === FORM_ACTION.ADD ? "Error adding Goal" : "Error updating Goal"}
          errors={errors}/>
      }

      <form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
        <div className="mb-6">
          <label htmlFor="base-input"
                 className={`${cryptoNameInputError ?
                   'text-red-500' :
                   'text-gray-900'} 
                   block mb-2 text-sm font-medium`}>
            Crypto Name
          </label>
          {
            action == FORM_ACTION.ADD &&
            <input type="text"
                   id="base-input"
                   autoComplete="off"
                   placeholder="Bitcoin"
                   maxLength={64}
                   onChange={event => handleCryptoNameChange(event)}
                   className={`${cryptoNameInputError ?
                     'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 focus:outline-none' :
                     'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'} 
                     border text-sm rounded-lg block w-full p-2.5`}/>
          }
          {
            action == FORM_ACTION.UPDATE &&
            <input type="text"
                   id="disabled-input-2"
                   defaultValue={goal?.cryptoName}
                   aria-label="disabled input"
                   className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
                   disabled readOnly/>
          }
          {
            cryptoNameInputError &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
              Crypto name must be 1-64 characters, using only letters, numbers and whitespaces.
            </p>
          }
        </div>

        <div className="mb-6">
          <label htmlFor="base-input"
                 className={`${quantityInputError ?
                   'text-red-500' :
                   'text-gray-900'} block mb-2 text-sm font-medium`}>
            Goal Quantity
          </label>
          <input type="number"
                 id="base-input"
                 autoComplete="off"
                 value={quantityGoal.toString()}
                 onChange={event => handleQuantityChange(event)}
                 className={`${quantityInputError ?
                   'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 focus:outline-none' :
                   'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'} 
                 border text-sm rounded-lg block w-full p-2.5`}/>
          {
            quantityInputError &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
              Enter a number between 0 and 9999999999999999.999999999999.
            </p>
          }
        </div>

        {
          action === FORM_ACTION.ADD &&
          <ActionButton
            text="Add Goal"
            actionFunction={() => addGoal({
              cryptoName,
              quantityGoal
            })}/>
        }
        {
          action === FORM_ACTION.UPDATE &&
          <ActionButton
            text={`Update ${goal?.cryptoName} Goal`}
            actionFunction={() => updateGoal(quantityGoal)}/>
        }
      </form>
    </div>
  );
}

export default GoalForm