import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import ChartSkeleton from "../../skeletons/ChartSkeleton";
import ErrorAlert from "../../page/ErrorAlert";
import {getDashboardsPlatformsBalancesService} from "../../../services/platformServvice";
import {Platforms} from "../../../model/response/platform/Platforms";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const PlatformBalancesChart = () => {

  const [platformsBalances, setPlatformsBalances] = useState<Platforms[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await getDashboardsPlatformsBalancesService();
          setPlatformsBalances(response.platforms);
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
        !error && !loading && platformsBalances?.length > 0 &&
        <Fragment>
          <h1 className="text-4xl text-center">
            All Platforms Distributions
          </h1>

          <Chart
            chartType="PieChart"
            data={[
              ["Cryptos", "Balances"],
              ...platformsBalances.map(platform => [platform.platform_name, platform.balance || 0])
            ]}
            options={options}
            width={"100%"}
            height={"650px"}
          />
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

export default PlatformBalancesChart