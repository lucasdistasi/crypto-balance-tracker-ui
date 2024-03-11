import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment} from "react";
import withScrollToTop from "../../hoc/withScrollToTop";
import {useSortParams} from "../../hooks/useSortParams";
import {usePageUserCryptosInsightsResponse} from "../../hooks/usePageUserCryptosInsightsResponse";
import {retrieveCryptosInsightsByPage} from "../../services/insightsService";
import {PageUserCryptosInsightsResponse} from "../../model/response/insight/PageUserCryptosInsightsResponse";
import NoCryptosFoundAlert from "../../components/crypto/NoCryptosFoundAlert";
import FilterField from "../../components/commons/FilterField";
import SortCryptosInsights from "../../components/insights/SortCryptosInsights";
import LoadMoreButton from "../../components/buttons/LoadMoreButton";
import CryptoInsightsCards from "../../components/insights/CryptoInsightsCards";
import CardsInsightsSkeleton from "../../components/skeletons/CardsInsightsSkeleton";

const CryptosInsightsPage = () => {

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
    filterTable
  } = usePageUserCryptosInsightsResponse(() => retrieveCryptosInsightsByPage(0, sortParams));

  const retrieveSortedResults = async () => {
    const response: PageUserCryptosInsightsResponse = await retrieveCryptosInsightsByPage(0, sortParams);
    setPage(0);
    setPageUserCryptosInsightsResponse(response);
    filteredCryptos.current = response.cryptos;
  }

  return (
    <Fragment>
      <Navbar/>
      {
        (pageUserCryptosInsightsResponse.cryptos === undefined || pageUserCryptosInsightsResponse.cryptos?.length === 0) &&
        !isLoadingUserCryptosInsights &&
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
          <FilterField filterFunction={filterTable}
                       placeHolder="Search by crypto name or symbol/ticker"/>

          <SortCryptosInsights updateSortBy={updateSortBy}
                               updateSortType={updateSortType}
                               retrieveSortedResults={retrieveSortedResults}/>

          <CryptoInsightsCards cryptos={filteredCryptos.current}/>
        </div>
      }

      {
        !error && !isLoadingUserCryptosInsights && pageUserCryptosInsightsResponse.hasNextPage &&
        <LoadMoreButton loadMoreCallback={() => loadMoreCryptos(retrieveCryptosInsightsByPage(page + 1, sortParams))}
                        isLoadingMore={isLoadingMore}/>
      }
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(CryptosInsightsPage)