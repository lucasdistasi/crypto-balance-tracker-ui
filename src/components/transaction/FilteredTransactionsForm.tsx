import React, {Fragment} from "react";
import dayjs from "dayjs";
import {TransactionType} from "../../model/TransactionType";

const FilteredTransactionsForm = ({handleChange, applyFilters, resetFilters}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
  applyFilters: () => void,
  resetFilters: () => void
}) => {

  const dateFrom = dayjs().subtract(6, 'month').format('YYYY-MM-DD')
  const dateTo = dayjs().format('YYYY-MM-DD')

  return (
    <Fragment>
      <div>
        <input type="text"
               id="dateFrom"
               defaultValue={dateFrom}
               onChange={e => handleChange(e)}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

        <input type="text"
               id="dateTo"
               defaultValue={dateTo}
               onChange={e => handleChange(e)}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>


        <input type="text"
               id="cryptoTicker"
               placeholder="Crypto Ticker"
               onChange={e => handleChange(e)}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

        <input type="text"
               id="platform"
               placeholder="Platform"
               onChange={e => handleChange(e)}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

        <form className="max-w-sm mx-auto">
          <select id="transactionType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={e => handleChange(e)}>
            <option>Transaction Type</option>
            <option>ALL</option>
            <option value={TransactionType.BUY}>BUY</option>
            <option value={TransactionType.SELL}>SELL</option>
          </select>
        </form>

        <button type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={applyFilters}>
          Apply Filters
        </button>

        <button type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={resetFilters}>
          Reset
        </button>
      </div>
    </Fragment>
  )
}

export default FilteredTransactionsForm;