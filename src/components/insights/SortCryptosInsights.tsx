import {SortBy} from "../../enums/SortBy";
import {SortType} from "../../enums/SortType";
import React from "react";

const SortCryptosInsights = ({updateSortBy, updateSortType, retrieveSortedResults}: {
  updateSortBy: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  updateSortType: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  retrieveSortedResults: () => void
}) => {

  return (
    <div className="container flex mb-3 items-cente justify-between w-full flex-col lg:w-1/2 lg:flex-row gap-2 lg:gap-0">
      <select id="sort-by-options"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-dark-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full lg:w-2/5"
              onChange={(e) => updateSortBy(e)}>
        <option value={SortBy.PERCENTAGE}>Sort by</option>
        <option value={SortBy.PERCENTAGE}>Percentage</option>
        <option value={SortBy.CURRENT_PRICE}>Current Price</option>
        <option value={SortBy.CHANGE_PRICE_IN_24H}>Change Price In 24H</option>
        <option value={SortBy.CHANGE_PRICE_IN_7D}>Change Price In 7D</option>
        <option value={SortBy.CHANGE_PRICE_IN_30D}>Change Price In 30D</option>
      </select>

      <select id="sort-type-options"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-dark-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full lg:w-2/5"
              onChange={(e) => updateSortType(e)}>
        <option value={SortType.DESCENDING}>Sort Type</option>
        <option value={SortType.ASCENDING}>Ascending</option>
        <option value={SortType.DESCENDING}>Descending</option>
      </select>

      <button type="button"
              className="py-2.5 px-5 text-sm font-medium text-gray-700 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-dark-1 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => retrieveSortedResults()}>
        Apply
      </button>
    </div>
  );
}

export default SortCryptosInsights;