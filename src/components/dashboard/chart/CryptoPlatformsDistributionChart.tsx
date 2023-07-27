import React, {Fragment, useEffect, useState} from "react";
import {CryptoPlatformsDistributionResponse} from "../../../model/response/crypto/CryptoPlatformsDistributionResponse";
import {Chart} from "react-google-charts";
import ChartSkeleton from "../../skeletons/ChartSkeleton";
import ErrorAlert from "../../page/ErrorAlert";
import {getDashboardsCryptosPlatformsDistributionService} from "../../../services/platformServvice";

const CryptoPlatformsDistributionChart = () => {

  const [response, setResponse] = useState<CryptoPlatformsDistributionResponse[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await getDashboardsCryptosPlatformsDistributionService();
          setResponse(response);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

  return (
    <Fragment>
      {
        !error && !loading && response?.length > 0 &&
        <Fragment>
          <h1 className="text-4xl">
            Crypto Distribution
          </h1>

          {
            response.map(crypto => {
              return (
                <Chart
                  key={crypto.cryptoId}
                  chartType="PieChart"
                  data={[
                    ["Cryptos", "Balances"],
                    ...crypto.cryptos.map(crypto => [crypto.platform, crypto.balance])
                  ]}
                  options={{
                    title: `${crypto.cryptoId.toUpperCase()}`,
                    titleTextStyle: {fontSize: 32, textAlign: "center"},
                  }}
                  width={"100%"}
                  height={"650px"}
                />
              );
            })
          }
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

export default CryptoPlatformsDistributionChart