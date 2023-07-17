import React, {Fragment, useEffect, useState} from "react";
import {GoalResponse} from "../../model/response/goal/GoalResponse";
import Spinner from "../page/Spinner";
import ErrorAlert from "../page/ErrorAlert";
import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";
import GoalProgress from "./GoalProgress";
import {deleteGoalService, getAllGoalsService} from "../../services/goalService";
import {useNavigate} from "react-router-dom";
import {TableColumnTitle} from "../table/TableColumnTitle";
import {TableColumnContent} from "../table/TableColumnContent";

const GoalsTable = () => {

  const navigate = useNavigate();

  const [goals, setGoals] = useState<GoalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const allGoals = await getAllGoalsService();
          setGoals(allGoals);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

  const deleteGoal = async (goalId: string) => {
    try {
      await deleteGoalService({goalId})
      const updatedGoals = goals.filter(goal => goal.goalId !== goalId);
      setGoals(updatedGoals);
    } catch (error: any) {
      navigate("/error");
    }
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
              <TableColumnTitle title="Crypto"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Goal Quantity"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Progress"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Remaining Quantity"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Money Needed"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Action"
                                additionalClasses="text-center"/>
            </tr>
            </thead>
            <tbody className="w-full">
            {
              goals.map(goal => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                    key={goal.goalId}>

                    <TableColumnContent content={goal.cryptoName}
                                        rowScope={true}
                                        additionalClasses="text-center"/>
                    <TableColumnContent content={goal.goalQuantity.toString()}
                                        additionalClasses="text-center"/>
                    <td className="text-center">
                      <GoalProgress progress={goal.progress} actualQuantity={goal.actualQuantity}/>
                    </td>
                    <TableColumnContent content={goal.remainingQuantity.toString()}
                                        additionalClasses="text-center"/>
                    <TableColumnContent content={`U$D ${goal.moneyNeeded.toString()}`}
                                        additionalClasses="text-center"/>
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