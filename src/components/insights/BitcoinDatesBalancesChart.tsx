import React, {Fragment, useEffect, useState} from "react";
import {DatesBalanceResponse, DatesBalances} from "../../model/response/insight/DatesBalanceResponse";
import {balancesPeriodValues, btcBalancesChartOptions} from "../../utils/utils";
import {retrieveDaysBalancesInsights} from "../../services/insightsService";
import DatesBalancesAreaChartSkeleton from "../skeletons/DatesBalancesAreaChartSkeleton";
import ErrorAlert from "../page/ErrorAlert";
import BtcBalancesAreaChart from "./BtcBalancesAreaChart";

const BitcoinDatesBalancesChart = () => {

  const [datesBalanceResponse, setDatesBalanceResponse] = useState<DatesBalanceResponse>({
    datesBalances: [],
    change: {
      usdChange: 0,
      eurChange: 0,
      btcChange: 0
    },
    priceDifference: {
      usdDifference: "0",
      eurDifference: "0",
      btcDifference: "0"
    }
  });
  const [isLoadingDatesBalanceResponse, setIsLoadingDatesBalanceResponse] = useState(true);
  const [errorDatesBalanceResponse, setErrorDatesBalanceResponse] = useState(false);
  const [selectedPeriodTime, setSelectedPeriodTime] = useState("ONE_WEEK");
  const [chartTitle, setChartTitle] = useState("Last 7 days change");
  const [chartOptionsConfig, setChartOptionsConfig] = useState(btcBalancesChartOptions);

  const getDaysBalancesInsights = async (balancesPeriodValue: string) => {
    const response = await retrieveDaysBalancesInsights(balancesPeriodValue);
    setDatesBalanceResponse(response.data);

    return response;
  }

  const updateChartOptionsConfig = async (balancesPeriodValue: string) => {
    const response = await getDaysBalancesInsights(balancesPeriodValue);

    const dates: string[] = response.data.datesBalances?.map((dateBalance: DatesBalances) => dateBalance.date);
    const btcBalances: number[] = response.data.datesBalances?.map((dateBalance: DatesBalances) => dateBalance.balances.totalBTCBalance);

    setChartOptionsConfig({
      ...chartOptionsConfig,
      fill: {
        ...chartOptionsConfig.fill,
        gradient: {
          ...chartOptionsConfig.fill.gradient,
        },
      },
      series: [
        {
          name: "BTC Balance",
          data: btcBalances,
          color: "#FFC300",
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
    } finally {
      setIsLoadingDatesBalanceResponse(false);
    }
  }

  return(
    <Fragment>
      {
        !errorDatesBalanceResponse && !isLoadingDatesBalanceResponse && datesBalanceResponse.datesBalances?.length > 0 &&
        <BtcBalancesAreaChart datesBalanceResponse={datesBalanceResponse}
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
        <ErrorAlert message="Error retrieving btc dates balances"/>
      }
    </Fragment>
  )
}

export default BitcoinDatesBalancesChart
