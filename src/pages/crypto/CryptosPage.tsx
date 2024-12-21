import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment} from "react";
import withScrollToTop from "../../hoc/withScrollToTop";
import {useSortParams} from "../../hooks/useSortParams";
import {usePageUserCryptosInsightsResponse} from "../../hooks/usePageUserCryptosInsightsResponse";
import {retrieveCryptosPlatformsInsightsByPage} from "../../services/insightsService";
import {PageUserCryptosInsightsResponse} from "../../model/response/insight/PageUserCryptosInsightsResponse";
import NoCryptosFoundAlert from "../../components/crypto/NoCryptosFoundAlert";
import LoadMoreButton from "../../components/buttons/LoadMoreButton";
import InsightsSortFilterComponent from "../../components/insights/InsightsSortFilterComponent";
import {Link} from "react-router-dom";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

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
  } = usePageUserCryptosInsightsResponse(() => retrieveCryptosPlatformsInsightsByPage(0, sortParams));

  const retrieveSortedResults = async () => {
    setCryptosFilterValue("");
    const response: PageUserCryptosInsightsResponse = await retrieveCryptosPlatformsInsightsByPage(0, sortParams);
    setPage(0);
    setPageUserCryptosInsightsResponse(response);
    filteredCryptos.current = response.cryptos;
  }

  const returnChangePercentageColor = (changePercentage: string) => {
    if (Number(changePercentage) < 0) {
      return "text-red-500";
    }

    if (Number(changePercentage) > 0) {
      return "text-green-500"
    }

    return "text-gray-50"
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
          <InsightsSortFilterComponent filterFunction={filterTable}
                                       filterValue={cryptosFilterValue}
                                       updateSortBy={updateSortBy}
                                       updateSortType={updateSortType}
                                       retrieveSortedResults={retrieveSortedResults}/>

          <div className="relative overflow-x-auto rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Crypto</th>
                <th scope="col" className="px-6 py-3">Percentage</th>
                <th scope="col" className="px-6 py-3">Balance</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">24H Change</th>
                <th scope="col" className="px-6 py-3">7D Change</th>
                <th scope="col" className="px-6 py-3">30D Change</th>
                <th scope="col" className="px-6 py-3">View</th>
              </tr>
              </thead>
              <tbody>
              {filteredCryptos.current.map((crypto, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                  <td className="px-6 py-4">{`$${crypto.balances.totalUSDBalance}`}</td>
                  <td className="px-6 py-4">{crypto.quantity}</td>
                  <td className="px-6 py-4">{`$${crypto.marketData.currentPrice.usd}`}</td>
                  <td
                    className={`px-6 py-4 ${returnChangePercentageColor(crypto.marketData.priceChange.changePercentageIn24h)}`}>
                    {`${crypto.marketData.priceChange.changePercentageIn24h}%`}
                  </td>
                  <td
                    className={`px-6 py-4 ${returnChangePercentageColor(crypto.marketData.priceChange.changePercentageIn7d)}`}>
                    {`${crypto.marketData.priceChange.changePercentageIn7d}%`}
                  </td>
                  <td
                    className={`px-6 py-4 ${returnChangePercentageColor(crypto.marketData.priceChange.changePercentageIn30d)}`}>
                    {`${crypto.marketData.priceChange.changePercentageIn30d}%`}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/insights/cryptos/${crypto.cryptoInfo.cryptoId}`}>
                      <button
                        type="button"
                        className="flex items-center justify-center w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
                      >
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

          </div>
        </div>
      }

      {
        !error && !isLoadingUserCryptosInsights && pageUserCryptosInsightsResponse.hasNextPage &&
        <LoadMoreButton
          loadMoreCallback={() => loadMoreCryptos(retrieveCryptosPlatformsInsightsByPage(page + 1, sortParams))}
          isLoadingMore={isLoadingMore}/>
      }
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(CryptosPage)