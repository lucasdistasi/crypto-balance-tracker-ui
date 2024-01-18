import React, {Fragment, useEffect, useRef, useState} from "react";
import Spinner from "../page/Spinner";
import ErrorAlert from "../page/ErrorAlert";
import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";
import GoalProgress from "./GoalProgress";
import {deleteGoalService, getGoalsByPageService} from "../../services/goalService";
import {useNavigate} from "react-router-dom";
import {TableColumnTitle} from "../table/TableColumnTitle";
import {TableColumnContent} from "../table/TableColumnContent";
import {PageGoalResponse} from "../../model/response/goal/PageGoalResponse";
import {SortedTableColumnTitle} from "../table/SortedTableColumnTitle";
import {GoalResponse} from "../../model/response/goal/GoalResponse";
import {GoalsOrderBy, sortGoals} from "../enums/GoalsOrderBy";

const GoalsTable = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageGoals, setPageGoals] = useState<PageGoalResponse>({
    goals: [],
    hasNextPage: false,
    page: 0,
    totalPages: 0
  });
  const filteredGoals = useRef<Array<GoalResponse>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortAscending, setSortAscending] = useState(false);
  const [hideAchieved, setHideAchieved] = useState(false);
  const [lastOrderBy, setLastOrderBy] = useState(GoalsOrderBy.DEFAULT);

  useEffect(() => {
    (async () => {
        try {
          const allGoals = await getGoalsByPageService(page);
          setPageGoals(allGoals);

          filteredGoals.current = hideAchieved
            ? allGoals.goals.filter((goal: GoalResponse) => goal.progress < 100)
            : allGoals.goals;
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
      const updatedGoals = pageGoals.goals.filter(goal => goal.id !== goalId);
      const {hasNextPage, page, totalPages} = pageGoals;

      setPageGoals({
        goals: updatedGoals,
        page,
        hasNextPage,
        totalPages
      });

      filteredGoals.current = hideAchieved ?
        updatedGoals.filter(goal => goal.progress < 100) :
        updatedGoals;
    } catch (error: any) {
      navigate("/error");
    }
  }

  const loadMoreGoals = async () => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const response: PageGoalResponse = await getGoalsByPageService(nextPage);
      setPageGoals({
        goals: [...pageGoals.goals, ...response.goals],
        hasNextPage: response.hasNextPage,
        page: response.page,
        totalPages: response.totalPages
      });

      const moreGoals = hideAchieved ? response.goals.filter(goal => goal.progress < 100) : response.goals;
      filteredGoals.current = sortGoals(lastOrderBy, [...filteredGoals.current, ...moreGoals], sortAscending);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoadingMore(false);
    }
  }

  const handleHideAchieved = () => {
    const allGoals = pageGoals.goals;
    const newHideAchievedValue = !hideAchieved;
    setHideAchieved(newHideAchievedValue);

    const goals = newHideAchievedValue
      ? allGoals.filter(goal => goal.progress < 100)
      : allGoals;

    filteredGoals.current = sortGoals(lastOrderBy, goals, sortAscending);
  }

  const sortByProgress = () => {
    const newSortAscendingValue = !sortAscending
    filteredGoals.current = sortGoals(GoalsOrderBy.SORT_BY_PROGRESS, filteredGoals.current, newSortAscendingValue);
    setSortAscending(newSortAscendingValue);
    setLastOrderBy(GoalsOrderBy.SORT_BY_PROGRESS);
  }

  const sortByMoneyNeeded = () => {
    const newSortAscendingValue = !sortAscending
    filteredGoals.current = sortGoals(GoalsOrderBy.SORT_BY_MONEY_NEEDED, filteredGoals.current, newSortAscendingValue);
    setSortAscending(newSortAscendingValue);
    setLastOrderBy(GoalsOrderBy.SORT_BY_MONEY_NEEDED);
  }

  const sortByCryptoName = () => {
    const newSortAscendingValue = !sortAscending
    filteredGoals.current = sortGoals(GoalsOrderBy.SORT_BY_CRYPTO_NAME, filteredGoals.current, newSortAscendingValue);
    setSortAscending(newSortAscendingValue);
    setLastOrderBy(GoalsOrderBy.SORT_BY_CRYPTO_NAME);
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
        !error && !loading && filteredGoals.current.length > 0 &&
        <div className="relative overflow-x-auto sm:rounded-lg w-11/12">
          <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-10 w-full lg:w-56">
            <input id="hide-achieved-goals-checkbox"
                   type="checkbox"
                   value=""
                   name="bordered-checkbox"
                   onChange={() => handleHideAchieved()}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="hide-achieved-goals-checkbox"
                   className="w-full py-4 pr-4 ms-2 text-gray-900 text-sm font-medium">
              Hide Achieved
            </label>
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <SortedTableColumnTitle title="Crypto"
                                      additionalClasses="text-center"
                                      sortFunction={sortByCryptoName}/>
              <TableColumnTitle title="Goal Quantity"
                                additionalClasses="text-center"/>
              <SortedTableColumnTitle title="Progress"
                                      additionalClasses="text-center"
                                      sortFunction={sortByProgress}/>
              <TableColumnTitle title="Remaining Quantity"
                                additionalClasses="text-center"/>
              <SortedTableColumnTitle title="Money Needed"
                                      additionalClasses="text-center"
                                      sortFunction={sortByMoneyNeeded}/>
              <TableColumnTitle title="Action"
                                additionalClasses="text-center"/>
            </tr>
            </thead>
            <tbody className="w-full">
            {
              filteredGoals.current.map(goal => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                    key={goal.id}>

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
                                        additionalClasses="whitespace-nowrap text-center"/>
                    <td
                      className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                      <EditButton editLink={`/goal/${goal.id}`}/>
                      <DeleteButton deleteFunction={() => deleteGoal(goal.id)}
                                    deleteId={goal.id}
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

      {
        !error && !loading && pageGoals.hasNextPage &&
        <button type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-10 w-1/2"
                onClick={loadMoreGoals}>
          Load more

          {
            isLoadingMore &&
            <svg aria-hidden="true"
                 role="status"
                 className="inline w-4 h-4 ml-3 text-white animate-spin"
                 viewBox="0 0 100 101"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"/>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"/>
            </svg>
          }

        </button>
      }
    </Fragment>
  )
}

export default GoalsTable