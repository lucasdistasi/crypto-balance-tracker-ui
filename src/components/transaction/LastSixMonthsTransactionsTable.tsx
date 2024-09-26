import React, {Fragment, useEffect, useRef, useState} from "react";
import {PageTransactionsResponse} from "../../model/response/transaction/PageTransactionsResponse";
import {retrievePageTransactions} from "../../services/transactionService";
import {TableColumnContent} from "../table/TableColumnContent";
import {TableColumnTitle} from "../table/TableColumnTitle";
import EditButton from "../table/EditButton";
import {TransactionType} from "../../model/TransactionType";
import {TransactionResponse} from "../../model/response/transaction/TransactionResponse";
import LoadMoreButton from "../buttons/LoadMoreButton";
import DeleteButton from "../table/DeleteButton";
import {useNavigate} from "react-router-dom";

const LastSixMonthsTransactionsTable = () => {

  const navigate = useNavigate();
  const [page, setPage] = useState(0)
  const [pageTransactionsResponse, setPageTransactionsResponse] = useState<PageTransactionsResponse>({
    page: 0,
    totalPages: 0,
    hasNextPage: false,
    transactions: []
  })
  const [isLoadingPageTransactions, setIsLoadingPageTransactions] = useState<boolean>(true)
  const [fetchApiErrors, setFetchApiErrors] = useState<boolean>(false) // TODO - CONVERT TO LIST OF ERRORS
  const transactionsRef = useRef<Array<TransactionResponse>>([])

  useEffect(() => {
    (async () => {
      try {
        const pageTransactionsResponse = await retrievePageTransactions(page)
        setPageTransactionsResponse(pageTransactionsResponse)
        transactionsRef.current = pageTransactionsResponse.transactions
      } catch (error: unknown) {
        setFetchApiErrors(true)
      } finally {
        setIsLoadingPageTransactions(false)
      }
    })()
  }, [])

  const getTransactionTypeColor = (transactionType: TransactionType): string => {
    return transactionType == TransactionType.BUY ? "text-green-700 dark:text-green-500" : "text-red-700 dark:text-red-600"
  }

  const deleteTransaction = async (transactionId: string) => {
    try {
      await deleteTransaction(transactionId)
      setPage(0)

      const pageTransactionsResponse = await retrievePageTransactions(page)
      setPageTransactionsResponse(pageTransactionsResponse)
      transactionsRef.current = pageTransactionsResponse.transactions
    } catch (error: unknown) {
      navigate("/error")
    }
  }

  const loadMoreTransactions = async () => {
    setIsLoadingPageTransactions(true)
    const nextPage = page + 1
    setPage(nextPage)

    try {
      const response = await retrievePageTransactions(page)
      setPageTransactionsResponse({
        ...response,
        transactions: [...pageTransactionsResponse.transactions, ...response.transactions]
      })
      transactionsRef.current = [...transactionsRef.current, ...response.transactions]
    } catch (error: unknown) {
      setFetchApiErrors(true);
    } finally {
      setIsLoadingPageTransactions(false);
    }
  }

  return (
    <Fragment>
      {
        !fetchApiErrors &&
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
              transactionsRef.current.map(transaction => {
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
                      <DeleteButton deleteFunction={() => deleteTransaction(transaction.id)}
                                    deleteId={transaction.id}
                                    deleteMessage={`Are you sure you want to delete this transaction for ${transaction.ticker}?`}/>
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
        !fetchApiErrors && !isLoadingPageTransactions && pageTransactionsResponse.hasNextPage &&
        <LoadMoreButton loadMoreCallback={() => loadMoreTransactions()}
                        isLoadingMore={isLoadingPageTransactions}/>
      }
    </Fragment>
  )
}

export default LastSixMonthsTransactionsTable