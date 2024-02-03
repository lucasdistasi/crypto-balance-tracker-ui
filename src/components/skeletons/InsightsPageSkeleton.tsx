import TotalBalancesCardsSkeleton from "./TotalBalancesCardsSkeleton";
import RadialChartSkeleton from "./RadialChartSkeleton";
import TableSkeleton from "./TableSkeleton";
import React, {Fragment} from "react";
import InsightsTitleSkeleton from "./InsightsTitleSkeleton";

const InsightsPageSkeleton = () => {

  return(
    <Fragment>
      <InsightsTitleSkeleton/>
      <TotalBalancesCardsSkeleton/>
      <RadialChartSkeleton/>
      <TableSkeleton/>
    </Fragment>
  );
}

export default InsightsPageSkeleton