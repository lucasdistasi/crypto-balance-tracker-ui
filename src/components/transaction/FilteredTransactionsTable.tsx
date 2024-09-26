import React, {Fragment, useEffect, useState} from "react";
import {TransactionResponse} from "../../model/response/transaction/TransactionResponse";
import {TransactionFilters} from "../../model/request/TransactionFIlters";
import {TableColumnTitle} from "../table/TableColumnTitle";
import {TableColumnContent} from "../table/TableColumnContent";
import EditButton from "../table/EditButton";
import {retrieveFilteredTransaction} from "../../services/transactionService";
import {TransactionType} from "../../model/TransactionType";

const FilteredTransactionsTable = ({filteredTransaction}: {
  filteredTransaction: Array<TransactionResponse>
}) => {

  const [isLoadingFilteredTransactions, setIsLoadingFilteredTransactions] = useState<boolean>(false)
  const [fetchApiErrors, setFetchApiErrors] = useState<boolean>(false)

  const getTransactionTypeColor = (transactionType: TransactionType): string => {
    return transactionType == TransactionType.BUY ? "text-green-700 dark:text-green-500" : "text-red-700 dark:text-red-600"
  }

  return (
    <Fragment>
      {
        !fetchApiErrors && !isLoadingFilteredTransactions &&
        <div className="relative overflow-x-auto rounded-lg w-11/12 mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <TableColumnTitle title="Ticker"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Transaction Type"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Quantity"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Price"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Total"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Platform"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Date"
                                additionalClasses="text-center"/>
              <TableColumnTitle title="Action"
                                additionalClasses="text-center"/>
            </tr>
            </thead>
            <tbody className="w-full">
            {
              filteredTransaction.map(transaction => {
                return (
                  <tr
                    className="bg-gray-100 border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                    key={transaction.id}>
                    <TableColumnContent content={transaction.ticker}
                                        rowScope={true}
                                        additionalClasses="text-center"/>
                    <TableColumnContent content={transaction.transactionType.toString()}
                                        additionalClasses={`text-center text-bold ${getTransactionTypeColor(transaction.transactionType)}`}/>
                    <TableColumnContent content={transaction.quantity}
                                        additionalClasses="text-center text-bold"/>
                    <TableColumnContent content={transaction.price}
                                        additionalClasses="text-center"/>
                    <TableColumnContent content={transaction.total}
                                        additionalClasses="text-center"/>
                    <TableColumnContent content={transaction.platform}
                                        additionalClasses="text-center text-bold"/>
                    <TableColumnContent content={transaction.date}
                                        additionalClasses="text-center"/>
                    <td
                      className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                      <EditButton editLink={`/price-targets/${transaction.id}`}/>

                      {/*<DeleteButton deleteFunction={() => deleteTransaction(transaction.id)}
                                    deleteId={transaction.id}
                                    deleteMessage={`Are you sure you want to delete this transaction for ${transaction.ticker}?`}/>*/}

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

export default FilteredTransactionsTable