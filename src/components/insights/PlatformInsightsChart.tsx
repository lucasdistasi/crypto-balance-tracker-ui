import React, {Fragment, useEffect, useState} from "react";
import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";
import {useNavigate, useParams} from "react-router-dom";
import Chart from "react-google-charts";
import ChartSkeleton from "../skeletons/ChartSkeleton";
import ErrorAlert from "../page/ErrorAlert";
import TotalBalanceCards from "./TotalBalanceCards";
import PlatformInsightsTable from "./PlatformInsightsTable";
import {retrievePlatformInsights} from "../../services/insightsService";

const PlatformInsightsChart = () => {

  const params = useParams();
  const navigate = useNavigate();
  const platformId: string = params.platformId!!;

  const [response, setResponse] = useState<PlatformInsightsResponse>({
    balances: {
      totalUSDBalance: "0",
      totalEURBalance: "0",
      totalBTCBalance: "0"
    },
    cryptos: [],
    platformName: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const platformName = `${response.platformName} DISTRIBUTION`;

  useEffect(() => {
    (async () => {
        try {
          const response = await retrievePlatformInsights(platformId);

          if (!response ||  response.status === 204) {
            navigate("/");
          }

          setResponse(response);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )()
  }, [])

  function getData() {
    const cryptos = response.cryptos.map(crypto => [crypto.cryptoName, Number(crypto.balances.totalUSDBalance)]);

    return [["Cryptos", "USD Balance"], ...cryptos];
  }

  return (
    <Fragment>
      {
        !error && !loading && response.cryptos?.length > 0 &&
        <Fragment>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-center my-12">
              { platformName }
            </h1>

            <TotalBalanceCards totalUsdValue={Number(response.balances.totalUSDBalance)}
                               totalEurValue={Number(response.balances.totalEURBalance)}
                               totalBtcValue={Number(response.balances.totalBTCBalance)}/>

            <Chart
              chartType="PieChart"
              data={getData()}
              options={{
                titleTextStyle: {fontSize: 32, textAlign: "center"}
              }}
              width={"100%"}
              height={"650px"}
            />
          </div>

          <PlatformInsightsTable platformInsightsResponse={response}/>
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

export default PlatformInsightsChart