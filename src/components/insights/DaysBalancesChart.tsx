import React, {Fragment, useEffect, useState} from "react";
import BalancesAreaChart from "./BalancesAreaChart";
import ErrorAlert from "../page/ErrorAlert";
import DatesBalancesAreaChartSkeleton from "../skeletons/DatesBalancesAreaChartSkeleton";
import {DatesBalanceResponse, DatesBalances} from "../../model/response/insight/DatesBalanceResponse";
import {retrieveDaysBalancesInsights} from "../../services/insightsService";
import {chartOptions} from "../../model/ChartOptions";

export const balancesPeriodValues: Record<string, [string, string]> = {
  ONE_DAY: ['ONE_DAY', 'Last day change'],
  THREE_DAYS: ['THREE_DAYS', 'Last 3 days change'],
  ONE_WEEK: ['ONE_WEEK', 'Last 7 days change'],
  ONE_MONTH: ['ONE_MONTH', 'Last month change'],
  THREE_MONTHS: ['THREE_MONTHS', 'Last 3 months change'],
  SIX_MONTHS: ['SIX_MONTHS', 'Last 6 months change'],
  ONE_YEAR: ['ONE_YEAR', 'Last year change'],
};

const DaysBalancesChart = () => {

  const [datesBalanceResponse, setDatesBalanceResponse] = useState<DatesBalanceResponse>({
    datesBalances: [],
    change: 0,
    priceDifference: "0"
  });
  const [isLoadingDatesBalanceResponse, setIsLoadingDatesBalanceResponse] = useState(true);
  const [errorDatesBalanceResponse, setErrorDatesBalanceResponse] = useState(false);
  const [selectedPeriodTime, setSelectedPeriodTime] = useState("ONE_WEEK");
  const [chartTitle, setChartTitle] = useState("Last 7 days change");
  const [chartOptionsConfig, setChartOptionsConfig] = useState(chartOptions);

  const retrieveGradientColor = (datesBalanceResponse: DatesBalanceResponse) => {
    if (datesBalanceResponse.change > 0) {
      return "#04A71A";
    }

    if (datesBalanceResponse.change < 0) {
      return "#BE3D3DFF";
    }

    return "#1C64F2";
  }

  const getDaysBalancesInsights = async (balancesPeriodValue: string) => {
    const response = await retrieveDaysBalancesInsights(balancesPeriodValue);
    setDatesBalanceResponse(response.data);

    return response;
  }

  const updateChartOptionsConfig = async (balancesPeriodValue: string) => {
    const response = await getDaysBalancesInsights(balancesPeriodValue);

    const dates = response.data.datesBalances?.map((dateBalance: DatesBalances) => dateBalance.date);
    const balances = response.data.datesBalances?.map((dateBalance: DatesBalances) => dateBalance.balance);

    setChartOptionsConfig({
      ...chartOptionsConfig,
      fill: {
        ...chartOptionsConfig.fill,
        gradient: {
          ...chartOptionsConfig.fill.gradient,
          shade: retrieveGradientColor(response.data),
          gradientToColors: [retrieveGradientColor(response.data)],
        },
      },
      series: [
        {
          name: "USD Balance",
          data: balances,
          color: retrieveGradientColor(response.data),
        },
      ],
      xaxis: {
        ...chartOptionsConfig.xaxis,
        categories: dates,
      },
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const [defaultPeriod] = balancesPeriodValues["ONE_WEEK"];
        await updateChartOptionsConfig(defaultPeriod);
      } catch (err) {
        setErrorDatesBalanceResponse(true);
      } finally {
        setIsLoadingDatesBalanceResponse(false);
      }
    })()
  }, []);

  const updateDatesRange = async (periodType: string) => {
    setIsLoadingDatesBalanceResponse(true);
    setSelectedPeriodTime(periodType);

    const [period, chartTitle] = balancesPeriodValues[periodType] || balancesPeriodValues.ONE_WEEK;
    setChartTitle(chartTitle);

    try {
      await updateChartOptionsConfig(period);
    } catch (err) {
      setErrorDatesBalanceResponse(true);
      console.log(err)
    } finally {
      setIsLoadingDatesBalanceResponse(false);
    }
  }

  return (
    <Fragment>
      {
        !errorDatesBalanceResponse && !isLoadingDatesBalanceResponse &&
        <BalancesAreaChart datesBalanceResponse={datesBalanceResponse}
                           updateDatesRange={updateDatesRange}
                           chartOptions={chartOptionsConfig}
                           chartTitle={chartTitle}
                           selectedPeriodTime={selectedPeriodTime}/>
      }

      {
        !errorDatesBalanceResponse && isLoadingDatesBalanceResponse &&
        <DatesBalancesAreaChartSkeleton/>
      }

      {
        !isLoadingDatesBalanceResponse && errorDatesBalanceResponse &&
        <ErrorAlert message="Error retrieving dates balances"/>
      }
    </Fragment>
  );
}

export default DaysBalancesChart