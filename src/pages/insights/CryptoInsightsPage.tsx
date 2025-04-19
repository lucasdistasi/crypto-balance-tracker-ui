import withScrollToTop from "../../hoc/withScrollToTop";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CryptoInsightResponse} from "../../model/response/insight/CryptoInsightResponse";
import {retrieveCryptoInsights} from "../../services/insightsService";
import CryptoInsightsTable from "../../components/insights/CryptoInsightsTable";
import InsightsPageSkeleton from "../../components/skeletons/InsightsPageSkeleton";
import ErrorComponent from "../../components/page/ErrorComponent";
import BalancesPieChart from "../../components/insights/BalancesPieChart";
import InsightCard from "../../components/insights/InsightCard";

const CryptoInsightsPage = () => {

  // TODO - handle !error && !isLoadingCryptoInsightResponse && !cryptoInsightResponse on render

  const params = useParams();
  const coingeckoCryptoId: string = params.coingeckoCryptoId!;
  const [cryptoInsightResponse, setCryptoInsightResponse] = useState<CryptoInsightResponse>({
    cryptoName: "",
    balances: {
      fiat: {
        usd: "0",
        eur: "0"
      },
      btc: "0"
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
        } catch (error: unknown) {
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

            <InsightCard title={"Total value in USD"}
                         value={Number(cryptoInsightResponse.balances.fiat.usd)}
                         decimals={2}
                         symbol="$"/>
            <InsightCard title={"Total value in EUR"}
                         value={Number(cryptoInsightResponse.balances.fiat.eur)}
                         decimals={2}
                         symbol="€"/>
            <InsightCard title={"Total value in BTC"}
                         value={Number(cryptoInsightResponse.balances.btc)}
                         decimals={8}
                         symbol="₿"/>

            <BalancesPieChart chartId="platform-pie-chart"
                              chartTitle={`${cryptoInsightResponse.cryptoName.toUpperCase()} DISTRIBUTION`}
                              series={cryptoInsightResponse.platforms.map(platform => Number(platform.balances.fiat.usd))}
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