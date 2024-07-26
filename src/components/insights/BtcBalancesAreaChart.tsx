import {DatesBalanceResponse} from "../../model/response/insight/DatesBalanceResponse";
import React, {useEffect} from "react";
import ApexCharts from "apexcharts";
import GreenArrow from "./GreenArrow";
import RedArrow from "./RedArrow";
import {balancesPeriodValues} from "../../utils/utils";

const BtcBalancesAreaChart = ({datesBalanceResponse, updateDatesRange, selectedPeriodTime, chartOptions, chartTitle}: {
  datesBalanceResponse: DatesBalanceResponse,
  updateDatesRange: (periodType: string) => Promise<void>,
  selectedPeriodTime: string,
  chartOptions: object,
  chartTitle: string,
}) => {

  useEffect(() => {
    if (document.getElementById("btc-balances-area-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("btc-balances-area-chart"), chartOptions);
      chart.render();
    }
  }, []);

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateDatesRange(event.target.value);
  }

  const retrieveChangeColor = (datesBalanceResponse: DatesBalanceResponse) => {
    if (datesBalanceResponse.change.btcChange > 0) {
      return "text-green-500 dark:text-green-500";
    }

    if (datesBalanceResponse.change.btcChange < 0) {
      return "text-red-800 dark:text-red-300";
    }

    return "text-gray-900 dark:text-gray-200";
  }

  const getPriceDifference = () => {
    if (Number(datesBalanceResponse.priceDifference.btcDifference) > 0) {
      return `(+${datesBalanceResponse.priceDifference.btcDifference} BTC)`
    }

    if (Number(datesBalanceResponse.priceDifference.btcDifference) < 0) {
      return `(${datesBalanceResponse.priceDifference.btcDifference} BTC)`
    }

    return "(0)";
  }

  return (
    <div className="container flex flex-row mx-auto mb-20">
      <div className="w-full bg-gray-100 rounded-lg shadow p-4 md:p-6 dark:bg-gray-800">
        <div className="flex justify-between">
          <div>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {chartTitle}
            </p>
          </div>
          <div
            className={`flex items-center px-2.5 py-0.5 text-base font-semibold ${retrieveChangeColor(datesBalanceResponse)} text-center`}>
            {
              datesBalanceResponse &&
              `${datesBalanceResponse.change.btcChange}% ${datesBalanceResponse.change.btcChange !== 0 ? getPriceDifference() : ''}`
            }

            {
              datesBalanceResponse.change.btcChange > 0 &&
              <GreenArrow/>
            }

            {
              datesBalanceResponse.change.btcChange < 0 &&
              <RedArrow/>
            }
          </div>
        </div>

        {
          datesBalanceResponse?.datesBalances?.length > 1 ?
            <div id="btc-balances-area-chart"></div> :
            <p className="uppercase mx-auto py-10 text-gray-900 dark:text-white">
              Not enough data
            </p>
        }

        <select id="date-range"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={e => handleDateRangeChange(e)}
                defaultValue={selectedPeriodTime}>
          {
            Object.entries(balancesPeriodValues).map(([key, [_, title]]) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
}

export default BtcBalancesAreaChart