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
import CryptoInsightsCards from "../../components/insights/CryptoInsightsCards";
import CardsInsightsSkeleton from "../../components/skeletons/CardsInsightsSkeleton";
import InsightsSortFilterComponent from "../../components/insights/InsightsSortFilterComponent";
import {SortableTableColumnTitle} from "../../components/table/SortableTableColumnTitle";
import {TableColumnTitle} from "../../components/table/TableColumnTitle";
import {TableColumnContent} from "../../components/table/TableColumnContent";
import EditButton from "../../components/table/EditButton";
import TransferButton from "../../components/table/TransferButton";
import DeleteButton from "../../components/table/DeleteButton";
import {Link} from "react-router-dom";

const CryptosPlatformsInsightsPage = () => {

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
        <CardsInsightsSkeleton/>
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
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Crypto
                </th>
                <th scope="col" className="px-6 py-3">
                  Percentage
                </th>
                <th scope="col" className="px-6 py-3">
                  Balance
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  24H Change
                </th>
                <th scope="col" className="px-6 py-3">
                  7D Change
                </th>
                <th scope="col" className="px-6 py-3">
                  30D Change
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
              </tr>
              </thead>
              <tbody>
              {
                filteredCryptos.current.map((crypto, index) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4">
                        {index + 1}
                      </th>
                      <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full"
                             src={crypto.cryptoInfo.image}
                             alt={`${crypto.cryptoInfo.cryptoName} logo`}/>
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {crypto.cryptoInfo.symbol.toUpperCase()}
                          </div>
                          <div className="font-normal text-gray-500 max-w-[83px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {crypto.cryptoInfo.cryptoName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {`${crypto.percentage}%`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {`$${crypto.balances.totalUSDBalance}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {crypto.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {`$${crypto.marketData.currentPrice.usd}`}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${returnChangePercentageColor(crypto.marketData.priceChange.changePercentageIn24h)}`}>
                        {`${crypto.marketData.priceChange.changePercentageIn24h}%`}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${returnChangePercentageColor(crypto.marketData.priceChange.changePercentageIn7d)}`}>
                        {`${crypto.marketData.priceChange.changePercentageIn7d}%`}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${returnChangePercentageColor(crypto.marketData.priceChange.changePercentageIn30d)}`}>
                        {`${crypto.marketData.priceChange.changePercentageIn30d}%`}
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/insights/cryptos/`}>
                          <button type="button"
                                  className="w-2/4 whitespace-nowrap text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>


            {/*
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <TableColumnTitle title="#"
                                  additionalClasses="text-center"/>
                <TableColumnTitle title="Crypto"/>
                <TableColumnTitle title="Percentage"/>
                <TableColumnTitle title="Balance"/>
                <TableColumnTitle title="Quantity"/>
                <TableColumnTitle title="Current Price" additionalClasses="whitespace-nowrap"/>
                <TableColumnTitle title="24 hours change" additionalClasses="whitespace-nowrap"/>
                <TableColumnTitle title="7 days change" additionalClasses="whitespace-nowrap"/>
                <TableColumnTitle title="30 days change" additionalClasses="whitespace-nowrap"/>
                <TableColumnTitle title="Insights"
                                  additionalClasses="text-center"/>
              </tr>
              </thead>
              <tbody>
              {
                filteredCryptos.current.map((crypto, index) => {
                  return (
                    <tr key={crypto.cryptoInfo.cryptoId}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                      <TableColumnContent content={String(index + 1)}
                                          rowScope={true} additionalClasses="text-center"/>

                      <td className="flex px-6 py-4 text-gray-900 dark:text-white">
                      <img className="w-8 h-8 rounded-full"
                             src={crypto.cryptoInfo.image}
                             alt={`${crypto.cryptoInfo.cryptoName} logo`}/>
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {crypto.cryptoInfo.symbol.toUpperCase()}
                          </div>
                          <div
                            className="font-normal text-gray-500 max-w-[135px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {crypto.cryptoInfo.cryptoName}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-900 dark:text-gray-50">
                        <img className="w-8 h-8 rounded-full shadow-lg"
                             src={crypto.cryptoInfo.image}
                             alt={`${crypto.cryptoInfo.cryptoName}`}
                        />
                      </td>
                      <TableColumnContent content={`${crypto.cryptoInfo.cryptoName}`}
                                          additionalClasses="text-center max-w-[135px] overflow-hidden text-ellipsis whitespace-nowrap"/>

                      <TableColumnContent content={`${crypto.percentage}%`}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={`$${crypto.balances.totalUSDBalance}`}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={String(crypto.quantity)}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={`$${crypto.marketData.currentPrice.usd}`}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={`${crypto.marketData.priceChange.changePercentageIn24h}%`}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={`${crypto.marketData.priceChange.changePercentageIn7d}%`}
                                          additionalClasses="text-center"/>
                      <TableColumnContent content={`${crypto.marketData.priceChange.changePercentageIn30d}%`}
                                          additionalClasses="text-center"/>
                      <td
                        className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                        <Link to={`/insights/cryptos/${crypto.cryptoInfo.cryptoId}`}>
                          <button type="button"
                                  className="w-full whitespace-nowrap text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800">
                            View Insights
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
            */}




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

export default withScrollToTop(CryptosPlatformsInsightsPage)