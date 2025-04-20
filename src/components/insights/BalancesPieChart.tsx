import ApexCharts from "apexcharts";
import {useEffect} from "react";

const BalancesPieChart = ({chartId, chartTitle, series, labels}: {
  chartId: string,
  chartTitle: string
  series: number[],
  labels: string[]
}) => {

  const renderChart = () => {
    const labelPosition = window.screen.width >= 1024 ? 'right' : 'bottom';

    if (document.getElementById(chartId) && typeof ApexCharts !== 'undefined') {
      const options = {
        series,
        colors: randomColors(labels.length),
        chart: {
          height: 560,
          width: "100%",
          type: "pie",
        },
        stroke: {
          colors: ["white"],
          lineCap: "",
        },
        plotOptions: {
          pie: {
            labels: {
              show: true,
            },
            size: "100%",
            dataLabels: {
              offset: -25
            }
          },
        },
        labels,
        dataLabels: {
          enabled: false,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        legend: {
          position: labelPosition,
          fontFamily: "Inter, sans-serif",
        },
        yaxis: {
          labels: {
            formatter: function (value: string) {
              return `$${value}`
            },
          },
        },
      };

      const chart = new ApexCharts(document.getElementById(chartId), options);
      chart.render();
    }
  }

  useEffect(() => {
    renderChart();
  }, []);

  const randomColors = (quantity: number) => {
    const colors = [];
    const hexValues = '0123456789ABCDEF';

    for (let i = 0; i < quantity; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += hexValues[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }

    return colors;
  }

  return (
    <div className="w-11/12 md:w-1/2 bg-gray-100 rounded-lg shadow p-4 mx-auto my-24 md:p-6 border-2 border-gray-300 dark:border-gray-800 dark:bg-dark-1">
      <div className="flex justify-between items-start">
        <div className="flex-col items-center">
          <div className="flex items-center mb-1">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
              {chartTitle}
            </h5>
          </div>
        </div>
      </div>
      <div className="py-6" id={chartId}></div>
    </div>
  );
}

export default BalancesPieChart