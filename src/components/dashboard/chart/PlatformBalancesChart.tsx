import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import {DASHBOARDS_PLATFORMS_BALANCES_ENDPOINT} from "../../../constants/Constants";
import {PlatformsBalancesResponse} from "../../../model/response/platform/PlatformsBalancesResponse";
import axios from "axios";
import ChartSkeleton from "../../skeletons/ChartSkeleton";
import ErrorAlert from "../../page/ErrorAlert";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const PlatformBalancesChart = () => {

  const [platformsBalances, setPlatformsBalances] = useState<PlatformsBalancesResponse>({
    platforms: [{
      percentage: 0,
      platformName: "",
      balance: 0n,
    }]
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await axios.get(DASHBOARDS_PLATFORMS_BALANCES_ENDPOINT);
          setPlatformsBalances(response.data);
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
      <h1 className="text-4xl text-center">
        All Platforms Distributions
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
        !error && !loading && platformsBalances.platforms.length > 0 &&
        <Chart
          chartType="PieChart"
          data={[
            ["Cryptos", "Balances"],
            ...platformsBalances.platforms.map(platform => [platform.platformName, platform.balance || 0])
          ]}
          options={options}
          width={"100%"}
          height={"650px"}
        />
      }
    </Fragment>
  );
}

export default PlatformBalancesChart