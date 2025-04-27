import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import DatesBalancesAreaChartSkeleton from "../skeletons/DatesBalancesAreaChartSkeleton";
import {DatesBalanceResponse, DatesBalances} from "../../model/response/insight/DatesBalanceResponse";
import {retrieveDaysBalancesInsights} from "../../services/insightsService";
import FiatBalancesAreaChart from "./FiatBalancesAreaChart";
import {balancesPeriodValues, usdBalancesChartOptions} from "../../utils/utils";

const FiatDatesBalancesChart = () => {

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
  const [chartOptionsConfig, setChartOptionsConfig] = useState(usdBalancesChartOptions);

  const retrieveUsdGradientColor = (datesBalanceResponse: DatesBalanceResponse) => {
    if (datesBalanceResponse.change.usdChange > 0) {
      return "#04A71A";
    }

    if (datesBalanceResponse.change.usdChange < 0) {
      return "#BE3D3DFF";
    }

    return "#1C64F2";
  }

  const getDaysBalancesInsights = async (balancesPeriodValue: string) => {
    const response: DatesBalanceResponse = await retrieveDaysBalancesInsights(balancesPeriodValue);
    setDatesBalanceResponse(response);

    return response;
  }

  const updateChartOptionsConfig = async (balancesPeriodValue: string) => {
    const response = await getDaysBalancesInsights(balancesPeriodValue);

    const dates: string[] = response.datesBalances?.map((dateBalance: DatesBalances) => dateBalance.date);
    const usdBalances: number[] = response.datesBalances?.map((dateBalance: DatesBalances) => Number(dateBalance.balances.fiat.usd));

    setChartOptionsConfig({
      ...chartOptionsConfig,
      fill: {
        ...chartOptionsConfig.fill,
        gradient: {
          ...chartOptionsConfig.fill.gradient,
          shade: retrieveUsdGradientColor(response),
          gradientToColors: [retrieveUsdGradientColor(response)],
        },
      },
      series: [
        {
          name: "USD Balance",
          data: usdBalances,
          color: retrieveUsdGradientColor(response),
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
      } catch (error: unknown) {
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
    } catch (error: unknown) {
      setErrorDatesBalanceResponse(true);
    } finally {
      setIsLoadingDatesBalanceResponse(false);
    }
  }

  return (
    <Fragment>
      {
        !errorDatesBalanceResponse && !isLoadingDatesBalanceResponse && datesBalanceResponse.datesBalances?.length > 0 &&
        <FiatBalancesAreaChart datesBalanceResponse={datesBalanceResponse}
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

export default FiatDatesBalancesChart