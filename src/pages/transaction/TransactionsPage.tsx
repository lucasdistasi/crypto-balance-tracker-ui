import React, {Fragment, useState} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddNewButton from "../../components/buttons/AddNewButton";
import FilteredTransactionsForm from "../../components/transaction/FilteredTransactionsForm";
import LastSixMonthsTransactionsTable from "../../components/transaction/LastSixMonthsTransactionsTable";
import FilteredTransactionsTable from "../../components/transaction/FilteredTransactionsTable";
import {TransactionFilters} from "../../model/request/TransactionFIlters";
import dayjs from "dayjs";
import {TransactionResponse} from "../../model/response/transaction/TransactionResponse";
import {retrieveFilteredTransaction} from "../../services/transactionService";

enum TransactionsFetchType {
  LAST_SIX_MONTHS = "LAST_SIX_MONTHS",
  FILTERED = "FILTERED"
}

const TransactionsPage = () => {

  const [transactionFetchType, setTransactionFetchType] = useState<TransactionsFetchType>(TransactionsFetchType.LAST_SIX_MONTHS)
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilters>({
    dateFrom: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
    dateTo: dayjs().format('YYYY-MM-DD')
  })
  const [filteredTransaction, setFilteredTransactions] = useState<Array<TransactionResponse>>([])
  const [isLoadingFilteredTransactions, setIsLoadingFilteredTransactions] = useState<boolean>(true)

  const resetFilters = () => {
    setTransactionFetchType(TransactionsFetchType.LAST_SIX_MONTHS)
  }

  const applyFilters = async () => {
    setTransactionFetchType(TransactionsFetchType.FILTERED)

    try {
      const transactions = await retrieveFilteredTransaction(transactionFilters)
      setFilteredTransactions(transactions)
    } catch (error: unknown) {

    } finally {
      setIsLoadingFilteredTransactions(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionFilters({
      ...transactionFilters,
      [event.target.id]: event.target.value
    })
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <AddNewButton text="+ Add New Transaction" href="/transaction"/>

        <FilteredTransactionsForm handleChange={handleChange}
                                  applyFilters={applyFilters}
                                  resetFilters={resetFilters}/>

        {
          transactionFetchType === TransactionsFetchType.LAST_SIX_MONTHS ?
            <LastSixMonthsTransactionsTable/> :
            <FilteredTransactionsTable filteredTransaction={filteredTransaction}/>
        }

      </div>
      <Footer/>
    </Fragment>
  )
}

export default TransactionsPage;