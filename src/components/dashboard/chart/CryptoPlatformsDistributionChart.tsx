import React, {Fragment, useEffect, useState} from "react";
import {CryptoPlatformsDistributionResponse} from "../../../response/crypto/CryptoPlatformsDistributionResponse";
import {Chart} from "react-google-charts";
import {DASHBOARDS_CRYPTOS_PLATFORMS_DISTRIBUTION_ENDPOINT} from "../../../constants/Constants";
import axios from "axios";
import ChartSkeleton from "../../skeletons/ChartSkeleton";
import ErrorAlert from "../../page/ErrorAlert";

const CryptoPlatformsDistributionChart = () => {

  const [response, setResponse] = useState<CryptoPlatformsDistributionResponse[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await axios.get(DASHBOARDS_CRYPTOS_PLATFORMS_DISTRIBUTION_ENDPOINT);
          setResponse(response.data);
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
      <h1 className="text-4xl">
        Crypto Distribution
      </h1>
      {
        loading && !error &&
        <ChartSkeleton/>
      }

      {
        error && !loading &&
        <ErrorAlert/>
      }

      {
        !error && !loading && response?.length > 0 &&
        response?.map(crypto => {
          return (
            <Chart
              key={crypto.crypto}
              chartType="PieChart"
              data={[
                ["Cryptos", "Balances"],
                ...crypto?.coins?.map(coin => [coin.platform, coin.balance])
              ]}
              options={{
                title: `${crypto.crypto.toUpperCase()}`,
                titleTextStyle: {fontSize: 32, textAlign: "center"},
              }}
              width={"100%"}
              height={"650px"}
            />
          );
        })
      }
    </Fragment>
  );
}

export default CryptoPlatformsDistributionChart