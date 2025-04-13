import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import {retrievePlatformsBalancesInsights} from "../../services/insightsService";
import RadialChartSkeleton from "../skeletons/RadialChartSkeleton";
import BalancesPieChart from "./BalancesPieChart";
import {BalancesChartResponse} from "../../model/response/insight/BalancesChartResponse";

const PlatformsBalancesChart = () => {

  const [platformsBalances, setPlatformsBalances] = useState<Array<BalancesChartResponse>>([
    {
      name: "",
      balance: "0",
      percentage: 0
    }
  ]);
  const [error, setError] = useState(false);
  const [isLoadingPlatformsBalances, setIsLoadingPlatformsBalances] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response: Array<BalancesChartResponse> = await retrievePlatformsBalancesInsights();
          setPlatformsBalances(response);
        } catch (error: unknown) {
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
        !error && !isLoadingPlatformsBalances && platformsBalances?.length > 0 &&
        <BalancesPieChart chartId="platforms-distribution-pie-chart"
                          chartTitle="Platforms Distributions"
                          series={platformsBalances.map(platform => Number(platform.balance))}
                          labels={platformsBalances.map(platform => `${platform.name} (${platform.percentage}%)`)}/>
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