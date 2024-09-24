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
        <div className="container mx-auto mt-20 mb-10 min-h-screen">
          <InsightsSortFilterComponent filterFunction={filterTable}
                                       filterValue={cryptosFilterValue}
                                       updateSortBy={updateSortBy}
                                       updateSortType={updateSortType}
                                       retrieveSortedResults={retrieveSortedResults}/>

          <CryptoInsightsCards cryptos={filteredCryptos.current}/>
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