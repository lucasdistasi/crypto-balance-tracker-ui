import {useEffect} from "react";
import ApexCharts from "apexcharts";
import {usdBalancesChartOptions} from "../../utils/utils";

const DatesBalancesAreaChartSkeleton = () => {

  useEffect(() => {
    if (document.getElementById("skeleton-area-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("skeleton-area-chart"), usdBalancesChartOptions);
      chart.render();
    }
  }, []);

  return (
    <div className="container flex flex-row mx-auto animate-pulse">
      <div className="w-full bg-gray-100 rounded-lg shadow-sm p-4 md:p-6 dark:bg-gray-800">
        <div className="flex justify-between">
          <div>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          </div>
          <div className={`flex items-center px-2.5 py-0.5 text-base font-semibold text-gray-700 text-center`}>
            Loading...
          </div>
        </div>

        <div id="skeleton-area-chart"></div>

        <select id="date-range"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled>
          <option>Last 7 days</option>
        </select>
      </div>
    </div>
  );
}

export default DatesBalancesAreaChartSkeleton