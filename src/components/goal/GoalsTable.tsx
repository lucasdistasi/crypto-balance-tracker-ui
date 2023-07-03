import React, {Fragment, useEffect, useState} from "react";
import {GoalResponse} from "../../model/response/goal/GoalResponse";
import axios from "axios";
import {GOALS_ENDPOINT} from "../../constants/Constants";
import Spinner from "../page/Spinner";
import ErrorAlert from "../page/ErrorAlert";
import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";
import GoalProgress from "./GoalProgress";

const GoalsTable = () => {

  const [goals, setGoals] = useState<GoalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const response = await axios.get(GOALS_ENDPOINT);
          setGoals(response.data);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

  const deleteGoal = async (goalId: string) => {
    const deleteGoalUrl = GOALS_ENDPOINT.concat(`/${goalId}`);

    const {status} = await axios.delete(deleteGoalUrl);
    const updatedGoals = goals.filter(goal => goal.goalId !== goalId);

    setGoals(updatedGoals);
  }

  return (
    <Fragment>
      {
        loading && !error &&
        <Spinner/>
      }

      {
        error && !loading &&
        <ErrorAlert message="Error retrieving goals"/>
      }

      {
        !error && !loading && goals?.length > 0 &&
        <div className="relative overflow-x-auto sm:rounded-lg m-10 w-11/12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 text-center">
                Crypto
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Goal Quantity
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Progress
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Remaining Quantity
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Money Needed
              </th>
              <th scope="col"
                  className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
            </thead>
            <tbody className="w-full">
            {
              goals.map(goal => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                      key={goal.goalId}>
                    <th scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {
                        goal.cryptoName
                      }
                    </th>
                    <td className="px-6 py-4 text-center">
                      {
                        goal.goalQuantity.toString()
                      }
                    </td>
                    <td className="text-center">
                      <GoalProgress progress={goal.progress} actualQuantity={goal.actualQuantity}/>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {
                        goal.remainingQuantity.toString()
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      {
                        `U$D ${goal.moneyNeeded.toString()}`
                      }
                    </td>
                    <td
                      className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                      <EditButton editLink={`/goal/${goal.goalId}`}/>
                      <DeleteButton deleteFunction={() => deleteGoal(goal.goalId)}
                                    deleteId={goal.goalId}
                                    deleteMessage={`Are you sure you want to delete your ${goal.cryptoName} goal?`}/>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      }
    </Fragment>
  )
}

export default GoalsTable