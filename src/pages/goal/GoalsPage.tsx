import React, {Fragment, useEffect, useRef, useState} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddNewButton from "../../components/buttons/AddNewButton";
import withScrollToTop from "../../hoc/withScrollToTop";
import {useNavigate} from "react-router-dom";
import {PageGoalResponse} from "../../model/response/goal/PageGoalResponse";
import {GoalResponse} from "../../model/response/goal/GoalResponse";
import {GoalsOrderBy, sortGoals} from "../../enums/GoalsOrderBy";
import {deleteGoalService, getGoalsByPageService} from "../../services/goalService";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import ErrorAlert from "../../components/page/ErrorAlert";
import {SortableTableColumnTitle} from "../../components/table/SortableTableColumnTitle";
import {TableColumnTitle} from "../../components/table/TableColumnTitle";
import {TableColumnContent} from "../../components/table/TableColumnContent";
import GoalProgress from "../../components/goal/GoalProgress";
import EditButton from "../../components/table/EditButton";
import DeleteButton from "../../components/table/DeleteButton";
import LoadMoreButton from "../../components/buttons/LoadMoreButton";
import Table from "../../components/table/Table";

const GoalsPage = () => {

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isLoadingMoreGoals, setIsLoadingMoreGoals] = useState(false);
  const [pageGoals, setPageGoals] = useState<PageGoalResponse>({
    goals: [],
    hasNextPage: false,
    page: 0,
    totalPages: 0
  });
  const filteredGoals = useRef<Array<GoalResponse>>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [error, setError] = useState(false);
  const [sortAscending, setSortAscending] = useState(false);
  const [hideAchieved, setHideAchieved] = useState(false);
  const [lastOrderBy, setLastOrderBy] = useState(GoalsOrderBy.DEFAULT);

  useEffect(() => {
    (async () => {
        try {
          const pageGoals = await getGoalsByPageService(page);
          setPageGoals(pageGoals);

          filteredGoals.current = hideAchieved
            ? pageGoals.goals.filter((goal: GoalResponse) => goal.progress < 100)
            : pageGoals.goals;
        } catch (error: unknown) {
          setError(true);
        } finally {
          setIsLoadingGoals(false);
        }
      }
    )();
  }, []);

  const deleteGoal = async (goalId: string) => {
    try {
      await deleteGoalService({goalId});
      const pageGoals = await getGoalsByPageService(0);
      setPageGoals(pageGoals);
      setPage(0);

      filteredGoals.current = hideAchieved
        ? pageGoals.goals.filter((goal: GoalResponse) => goal.progress < 100)
        : pageGoals.goals;
    } catch (error: unknown) {
      navigate("/error");
    }
  }

  const loadMoreGoals = async () => {
    setIsLoadingMoreGoals(true);
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const response = await getGoalsByPageService(nextPage);
      setPageGoals({
        goals: [...pageGoals.goals, ...response.goals],
        hasNextPage: response.hasNextPage,
        page: response.page,
        totalPages: response.totalPages
      });

      const moreGoals = hideAchieved ? response.goals.filter(goal => goal.progress < 100) : response.goals;
      filteredGoals.current = sortGoals(lastOrderBy, [...filteredGoals.current, ...moreGoals], sortAscending);
    } catch (error: unknown) {
      setError(true);
    } finally {
      setIsLoadingMoreGoals(false);
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
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <AddNewButton text="+ Add New Goal" href="/goal"/>
        {
          isLoadingGoals && !error &&
          <TableSkeleton/>
        }

        {
          error && !isLoadingGoals &&
          <ErrorAlert message="Error retrieving goals"/>
        }

        {
          !error && !isLoadingGoals && filteredGoals.current?.length > 0 &&
          <Fragment>
            <div className="w-11/12 mx-auto flex justify-start">
              <div className="flex items-center ps-4 border border-gray-600 rounded dark:border-gray-700 my-10 w-full lg:w-56">
                <input id="hide-achieved-goals-checkbox"
                       type="checkbox"
                       value=""
                       name="bordered-checkbox"
                       onChange={() => handleHideAchieved()}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="hide-achieved-goals-checkbox"
                       className="w-full py-4 pr-4 ms-2 text-gray-900 text-sm font-medium dark:text-gray-50">
                  Hide Achieved
                </label>
              </div>
            </div>

            <div className="relative overflow-x-auto rounded-lg w-11/12">
              <Table
                thead={
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <SortableTableColumnTitle title="Crypto"
                                              additionalClasses="text-center"
                                              sortFunction={sortByCryptoName}/>
                    <TableColumnTitle title="Goal Quantity"
                                      additionalClasses="text-center whitespace-nowrap"/>
                    <SortableTableColumnTitle title="Progress"
                                              additionalClasses="text-center"
                                              sortFunction={sortByProgress}/>
                      <TableColumnTitle title="Remaining Quantity"
                                        additionalClasses="text-center whitespace-nowrap"/>
                      <SortableTableColumnTitle title="Money Needed"
                                                additionalClasses="text-center whitespace-nowrap"
                                                sortFunction={sortByMoneyNeeded}/>
                      <TableColumnTitle title="Action"
                                        additionalClasses="text-center"/>
                    </tr>
                  }
                  tbody={
                    filteredGoals.current.map((goal, index) => (
                      <tr key={goal.id}
                          className="bg-gray-100 border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <img className="w-10 h-10 rounded-full" src={goal.cryptoInfo.image}
                                 alt={`${goal.cryptoInfo.cryptoName} logo`}/>
                            <div className="pl-3">
                              <div className="text-base font-semibold">
                                {goal.cryptoInfo.symbol.toUpperCase()}
                              </div>
                              <div
                                className="font-normal text-gray-500 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                                {goal.cryptoInfo.cryptoName}
                              </div>
                            </div>
                          </div>
                        </td>
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
                          className="px-6 py-4 text-center flex flex-col justify-center space-y-2 xl:space-y-0 xl:space-x-4 xl:flex-row">
                          <EditButton editLink={`/goal/${goal.id}`}/>
                          <DeleteButton deleteFunction={() => deleteGoal(goal.id)}
                                        deleteId={goal.id}
                                        deleteMessage={`Are you sure you want to delete your ${goal.cryptoInfo.cryptoName} goal?`}/>
                        </td>
                      </tr>
                    ))
                  }
                />
              </div>
          </Fragment>
        }

        {
          !error && !isLoadingGoals && pageGoals.hasNextPage &&
          <LoadMoreButton loadMoreCallback={() => loadMoreGoals()}
                          isLoadingMore={isLoadingMoreGoals}/>
        }
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(GoalsPage)