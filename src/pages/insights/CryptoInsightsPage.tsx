import withScrollToTop from "../../hoc/withScrollToTop";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CryptoInsightResponse} from "../../model/response/insight/CryptoInsightResponse";
import {retrieveCryptoInsights} from "../../services/insightsService";
import TotalBalanceCards from "../../components/insights/TotalBalanceCards";
import CryptoInsightsTable from "../../components/insights/CryptoInsightsTable";
import InsightsPageSkeleton from "../../components/skeletons/InsightsPageSkeleton";
import ErrorComponent from "../../components/page/ErrorComponent";
import BalancesPieChart from "../../components/insights/BalancesPieChart";

const CryptoInsightsPage = () => {

  const params = useParams();
  const coingeckoCryptoId: string = params.coingeckoCryptoId!!;
  const [cryptoInsightResponse, setCryptoInsightResponse] = useState<CryptoInsightResponse>({
    cryptoName: "",
    balances: {
      totalUSDBalance: "0",
      totalEURBalance: "0",
      totalBTCBalance: "0"
    },
    platforms: []
  });
  const [isLoadingCryptoInsightResponse, setIsLoadingCryptoInsightResponse] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const response: CryptoInsightResponse = await retrieveCryptoInsights(coingeckoCryptoId);
          setCryptoInsightResponse(response);
        } catch (err) {
          setError(true);
        } finally {
          setIsLoadingCryptoInsightResponse(false);
        }
      }
    )()
  }, []);

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        {
          !error && !isLoadingCryptoInsightResponse &&
          <Fragment>
            <h1 className="text-4xl text-center mt-10">
              {`${cryptoInsightResponse.cryptoName.toUpperCase()} DISTRIBUTION`}
            </h1>

            <TotalBalanceCards totalUsdValue={cryptoInsightResponse.balances.totalUSDBalance}
                               totalEurValue={cryptoInsightResponse.balances.totalEURBalance}
                               totalBtcValue={cryptoInsightResponse.balances.totalBTCBalance}/>

            <BalancesPieChart chartId="platform-pie-chart"
                              chartTitle={`${cryptoInsightResponse.cryptoName.toUpperCase()} DISTRIBUTION`}
                              series={cryptoInsightResponse.platforms.map(platform => Number(platform.balances.totalUSDBalance))}
                              labels={cryptoInsightResponse.platforms.map(platform => platform.platformName)}/>

            <CryptoInsightsTable cryptoInsightResponse={cryptoInsightResponse}/>
          </Fragment>
        }

        {
          !error && isLoadingCryptoInsightResponse &&
          <InsightsPageSkeleton/>
        }

        {
          error && !isLoadingCryptoInsightResponse &&
          <ErrorComponent text="Error retrieving crypto insights"/>
        }
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(CryptoInsightsPage);