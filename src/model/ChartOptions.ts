export const chartOptions = {
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