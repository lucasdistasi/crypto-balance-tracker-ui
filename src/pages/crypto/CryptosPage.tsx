import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment} from "react";
import withScrollToTop from "../../hoc/withScrollToTop";
import {useSortParams} from "../../hooks/useSortParams";
import {usePageUserCryptosInsightsResponse} from "../../hooks/usePageUserCryptosInsightsResponse";
import {retrieveCryptosInsightsByPage} from "../../services/insightsService";
import {PageUserCryptosInsightsResponse} from "../../model/response/insight/PageUserCryptosInsightsResponse";
import NoCryptosFoundAlert from "../../components/crypto/NoCryptosFoundAlert";
import LoadMoreButton from "../../components/buttons/LoadMoreButton";
import InsightsSortFilterComponent from "../../components/insights/InsightsSortFilterComponent";
import {Link} from "react-router-dom";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import AddNewButton from "../../components/buttons/AddNewButton";
import Table from "../../components/table/Table";
import {toLocale} from "../../utils/utils";

const CryptosPage = () => {

  const {sortParams, updateSortBy, updateSortType} = useSortParams();
  const {
    pageUserCryptosInsightsResponse,
    setPageUserCryptosInsightsResponse,
    filteredCryptos,
    page,
    setPage,
    error,
    isLoadingUserCryptosInsights,
    isLoadingMore,
    loadMoreCryptos,
    filterTable,
    cryptosFilterValue,
    setCryptosFilterValue
  } = usePageUserCryptosInsightsResponse(() => retrieveCryptosInsightsByPage(0, sortParams));

  const retrieveSortedResults = async () => {
    setCryptosFilterValue("");
    const response: PageUserCryptosInsightsResponse = await retrieveCryptosInsightsByPage(0, sortParams);
    setPage(0);
    setPageUserCryptosInsightsResponse(response);
    filteredCryptos.current = response.cryptos;
  }

  const returnChangePercentageColor = (changePercentage: string) => {
    if (Number(changePercentage) <= 0.5 && Number(changePercentage) >= -0.5) {
      return "text-black dark:text-white";
    }

    if (Number(changePercentage) < 0) {
      return "text-red-500";
    }

    if (Number(changePercentage) > 0) {
      return "text-green-500"
    }

    return "text-black dark:text-white"
  }

  return (
    <Fragment>
      <Navbar/>
      {
        (pageUserCryptosInsightsResponse.cryptos === undefined || pageUserCryptosInsightsResponse.cryptos?.length === 0)
        && !isLoadingUserCryptosInsights &&
        <div className="min-h-screen">
          <NoCryptosFoundAlert/>
        </div>
      }

      {
        isLoadingUserCryptosInsights && !error &&
        <TableSkeleton/>
      }

      {
        !error && !isLoadingUserCryptosInsights && pageUserCryptosInsightsResponse.cryptos?.length > 0 &&
        <div className="mx-10 max-w-[1920px] min-h-screen">
          <div className="flex justify-center my-10">
            <AddNewButton text="+ Add New Crypto" href="/crypto"/>
          </div>

          <InsightsSortFilterComponent filterFunction={filterTable}
                                       filterValue={cryptosFilterValue}
                                       updateSortBy={updateSortBy}
                                       updateSortType={updateSortType}
                                       retrieveSortedResults={retrieveSortedResults}/>

          <div className="relative overflow-x-auto rounded-lg mt-5">
            <Table
              thead={
                <tr>
                  <th scope="col" className="px-6 py-3">#</th>
                  <th scope="col" className="px-6 py-3">Crypto</th>
                  <th scope="col" className="px-6 py-3">Percentage</th>
                  <th scope="col" className="px-6 py-3">Balance</th>
                  <th scope="col" className="px-6 py-3">Quantity</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">24H Change</th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">7D Change</th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">30D Change</th>
                  <th scope="col" className="px-6 py-3">View</th>
                </tr>
              }
              tbody={
                filteredCryptos.current.map((crypto, index) => (
                  <tr key={crypto.cryptoInfo.cryptoId}
                      className="bg-gray-100 border-b hover:bg-gray-50 dark:bg-gray-900  dark:hover:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4">{index + 1}</th>
                    <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="w-10 h-10 rounded-full" src={crypto.cryptoInfo.image}
                           alt={`${crypto.cryptoInfo.cryptoName} logo`}/>
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {crypto.cryptoInfo.symbol.toUpperCase()}
                        </div>
                        <div
                          className="font-normal text-gray-500 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {crypto.cryptoInfo.cryptoName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{`${crypto.percentage}%`}</td>
                    <td className="px-6 py-4">
                      {`$${toLocale(crypto.balances.fiat.usd)}`}
                    </td>
                    <td className="px-6 py-4">
                      {toLocale(crypto.quantity)}
                    </td>
                    <td className="px-6 py-4">
                      {`$${toLocale(crypto.cryptoInfo.price!.usd)}`}
                    </td>
                    <td className={`px-6 py-4 ${returnChangePercentageColor(crypto.cryptoInfo.priceChange!.changePercentageIn24h!)}`}>
                      {`${crypto.cryptoInfo.priceChange!.changePercentageIn24h}%`}
                    </td>
                    <td className={`px-6 py-4 ${returnChangePercentageColor(crypto.cryptoInfo.priceChange!.changePercentageIn7d!)}`}>
                      {`${crypto.cryptoInfo.priceChange!.changePercentageIn7d}%`}
                    </td>
                    <td className={`px-6 py-4 ${returnChangePercentageColor(crypto.cryptoInfo.priceChange!.changePercentageIn30d!)}`}>
                      {`${crypto.cryptoInfo.priceChange!.changePercentageIn30d}%`}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/insights/cryptos/${crypto.cryptoInfo.cryptoId}`}>
                        <button
                          type="button"
                          className="flex items-center justify-center w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-hidden focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
                        >
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              }
            />
          </div>
        </div>
      }

      {
        !error && !isLoadingUserCryptosInsights && pageUserCryptosInsightsResponse.hasNextPage &&
        <LoadMoreButton
          loadMoreCallback={() => loadMoreCryptos(retrieveCryptosInsightsByPage(page + 1, sortParams))}
          isLoadingMore={isLoadingMore}/>
      }
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(CryptosPage)