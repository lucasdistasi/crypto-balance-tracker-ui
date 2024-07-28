import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import {retrievePlatformsBalancesInsights} from "../../services/insightsService";
import {PlatformsBalancesInsightsResponse} from "../../model/response/insight/PlatformsBalancesInsightsResponse";
import RadialChartSkeleton from "../skeletons/RadialChartSkeleton";
import BalancesPieChart from "./BalancesPieChart";

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
          const response: PlatformsBalancesInsightsResponse = await retrievePlatformsBalancesInsights();
          setPlatformsBalances(response);
        } catch (err) {
          setError(true);
        } finally {
          setIsLoadingPlatformsBalances(false);
        }
      }
    )();
  }, []);

  return (
    <Fragment>
      {
        !error && !isLoadingPlatformsBalances && platformsBalances.platforms?.length > 0 &&
        <BalancesPieChart chartId="platforms-distribution-pie-chart"
                          chartTitle="Platforms Distributions"
                          series={platformsBalances.platforms.map(platform => Number(platform.balances.totalUSDBalance))}
                          labels={platformsBalances.platforms.map(platform => `${platform.platformName} (${platform.percentage}%)`)}/>
      }

      {
        isLoadingPlatformsBalances && !error &&
        <RadialChartSkeleton/>
      }

      {
        error && !isLoadingPlatformsBalances &&
        <ErrorAlert message="Error retrieving platforms insights"/>
      }
    </Fragment>
  );
}

export default PlatformsBalancesChart