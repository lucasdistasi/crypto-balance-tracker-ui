import TotalBalancesCardsSkeleton from "./TotalBalancesCardsSkeleton";
import RadialChartSkeleton from "./RadialChartSkeleton";
import TableSkeleton from "./TableSkeleton";
import InsightsTitleSkeleton from "./InsightsTitleSkeleton";

const InsightsPageSkeleton = () => {

  return(
    <div className="container flex flex-col mx-auto">
      <InsightsTitleSkeleton/>
      <TotalBalancesCardsSkeleton/>
      <RadialChartSkeleton/>
      <TableSkeleton/>
    </div>
  );
}

export default InsightsPageSkeleton