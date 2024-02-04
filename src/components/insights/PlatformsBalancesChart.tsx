import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import ErrorAlert from "../page/ErrorAlert";
import {retrievePlatformsBalancesInsights} from "../../services/insightsService";
import {PlatformsBalancesInsightsResponse} from "../../model/response/insight/PlatformsBalancesInsightsResponse";
import RadialChartSkeleton from "../skeletons/RadialChartSkeleton";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const PlatformsBalancesChart = () => {

  const [platformsBalances, setPlatformsBalances] = useState<PlatformsBalancesInsightsResponse>({
    balances: {
      totalUSDBalance: "0",
      totalEURBalance: "0",
      totalBTCBalance: "0"
    },
    platforms: []
  });
  const [error, setError] = useState(false);
  const [isLoadingPlatformsBalances, setIsLoadingPlatformsBalances] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await retrievePlatformsBalancesInsights();
          setPlatformsBalances(response);
        } catch (err) {
          setError(true);
        } finally {
          setIsLoadingPlatformsBalances(false);
        }
      }
    )();
  }, []);

  function getData() {
    const platforms = platformsBalances.platforms?.map(platform => [platform.platformName, Number(platform.balances.totalUSDBalance)])

    return [["Platforms", "USD Balance"], ...platforms];
  }

  return (
    <Fragment>
      {
        !error && !isLoadingPlatformsBalances && platformsBalances.platforms?.length > 0 &&
        <Fragment>
          <h1 className="text-4xl text-center">
            All Platforms Distributions
          </h1>

          <Chart
            chartType="PieChart"
            data={getData()}
            options={options}
            width={"100%"}
            height={"650px"}
          />
        </Fragment>
      }

      {
        isLoadingPlatformsBalances && !error &&
        <RadialChartSkeleton/>
      }

      {
        error && !isLoadingPlatformsBalances &&
        <ErrorAlert/>
      }
    </Fragment>
  );
}

export default PlatformsBalancesChart