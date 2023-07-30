import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import {PlatformCryptosDistributionResponse} from "../../../model/response/platform/PlatformCryptosDistributionResponse";
import ChartSkeleton from "../../skeletons/ChartSkeleton";
import ErrorAlert from "../../page/ErrorAlert";
import {Link} from "react-router-dom";
import {getDashboardsPlatformsCryptosDistributionService} from "../../../services/platformServvice";

const PlatformsCryptosDistributionChart = () => {

  const [cryptoPlatformBalanceResponse, setCryptoPlatformBalanceResponses] = useState<PlatformCryptosDistributionResponse[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await getDashboardsPlatformsCryptosDistributionService();
          setCryptoPlatformBalanceResponses(response);
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
        !loading && !error && cryptoPlatformBalanceResponse?.length > 0 &&
        <Fragment>
          <h1 className="text-4xl">
            Platform Distribution
          </h1>

          {
            cryptoPlatformBalanceResponse.map(platformCryptos => {
              return (
                <Chart
                  key={platformCryptos.platform}
                  chartType="PieChart"
                  data={[
                    ["Cryptos", "Balances"],
                    ...platformCryptos.cryptos.map(crypto => [crypto.crypto_info.name, crypto.balance])
                  ]}
                  options={{
                    title: `${platformCryptos.platform}`,
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

      {
        !loading && !error && (!cryptoPlatformBalanceResponse || cryptoPlatformBalanceResponse?.length == 0) &&
        <div className="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3 my-8 w-11/12" role="alert">
          <p className="font-bold">No cryptos found</p>
          <p className="text-sm">
            Looks like you've no cryptos added. Go to <Link to="/cryptos"><span className="font-bold italic">this link</span></Link> to add a crypto and start viewing the charts.
          </p>
        </div>
      }
    </Fragment>
  );
}

export default PlatformsCryptosDistributionChart