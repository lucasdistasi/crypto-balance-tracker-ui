import React, {Fragment, useEffect, useState} from "react";
import Chart from "react-google-charts";
import ChartSkeleton from "../skeletons/ChartSkeleton";
import ErrorAlert from "../page/ErrorAlert";
import {CryptoInsightResponse} from "../../model/response/insight/CryptoInsightResponse";
import {useParams} from "react-router-dom";
import TotalBalanceCards from "./TotalBalanceCards";
import CryptoInsightsTable from "./CryptoInsightsTable";
import {retrieveCryptoInsights} from "../../services/insightsService";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const CryptoInsightsChart = () => {

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const response = await retrieveCryptoInsights(coingeckoCryptoId);
          setCryptoInsightResponse(response);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )()
  }, []);

  const getData = () => {
    const platforms = cryptoInsightResponse.platforms?.map(platform => [platform.platformName, Number(platform.balances.totalUSDBalance)]);

    return [["Platforms", "USD Balance"], ...platforms];
  }

  return (
    <Fragment>
      {
        !error && !loading && cryptoInsightResponse.platforms?.length > 0 &&
        <Fragment>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-center mt-10">
              {cryptoInsightResponse.cryptoName.toUpperCase()} DISTRIBUTION
            </h1>

            <TotalBalanceCards totalUsdValue={Number(cryptoInsightResponse.balances.totalUSDBalance)}
                               totalEurValue={Number(cryptoInsightResponse.balances.totalEURBalance)}
                               totalBtcValue={Number(cryptoInsightResponse.balances.totalBTCBalance)}/>

            <Chart
              chartType="PieChart"
              data={getData()}
              options={options}
              width={"100%"}
              height={"650px"}
            />
          </div>

          <CryptoInsightsTable cryptoInsightResponse={cryptoInsightResponse}/>
        </Fragment>
      }

      {
        loading && !error &&
        <ChartSkeleton/>
      }

      {
        error && !loading &&
        <ErrorAlert/>
      }
    </Fragment>
  );
}

export default CryptoInsightsChart