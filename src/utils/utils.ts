import axios from "axios";
import ErrorResponse from "../model/response/ErrorResponse";
import {NavigateFunction} from "react-router-dom";

export const isSuccessfulStatus = (status: number): boolean => {
  return status >= 200 && status < 300;
}

export const balancesPeriodValues: Record<string, [string, string]> = {
  LAST_DAY: ['LAST_DAY', 'Last day change'],
  THREE_DAYS: ['THREE_DAYS', 'Last 3 days change'],
  ONE_WEEK: ['ONE_WEEK', 'Last 7 days change'],
  ONE_MONTH: ['ONE_MONTH', 'Last month change'],
  THREE_MONTHS: ['THREE_MONTHS', 'Last 3 months change'],
  SIX_MONTHS: ['SIX_MONTHS', 'Last 6 months change'],
  ONE_YEAR: ['ONE_YEAR', 'Last year change'],
};

export const usdBalancesChartOptions = {
  chart: {
    height: "420px",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.75,
      opacityTo: 0.15,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 1,
      right: 1,
      top: 0
    },
  },
  series: [
    {
      name: "USD Balance",
      data: [0, 1.5, 0, 1],
      color: "#1C64F2",
    },
  ],
  xaxis: {
    categories: ['', '', '', ''],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    show: false,
  },
}

export const btcBalancesChartOptions = {
  chart: {
    height: "420px",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.75,
      opacityTo: 0.15,
      shade: "#FFC300",
      gradientToColors: ["#FFC300"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 1,
      right: 1,
      top: 0
    },
  },
  series: [
    {
      name: "BTC Balance",
      data: [0, 1.5, 0, 1],
      color: "#FFC300",
    },
  ],
  xaxis: {
    categories: ['', '', '', ''],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    show: false,
  },
}

export const defaultErrorResponse = () => {
  return [{
    title: "Unknown error",
    status: 400,
    detail: "Unknown error"
  }];
}

export const handleAxiosError = (
  error: unknown,
  setErrors: (errors: ErrorResponse[]) => void,
  navigate: NavigateFunction
) => {
  console.log(error);

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status && (status >= 400 && status < 500)) {
      const errorResponses: ErrorResponse[] = error.response?.data as ErrorResponse[] ?? defaultErrorResponse();
      setErrors(errorResponses);

      return;
    }
  }

  navigate("/error");
}

export const toLocale = (value: number | string) => {
  const number = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(number)) {
    throw new Error(`Invalid number value for ${number}`);
  }

  console.log(number);

  const decimalDigits = number.toString().split('.')[1]?.length ?? 0;

  return number.toLocaleString("en-US", {
    maximumFractionDigits: decimalDigits
  })
}