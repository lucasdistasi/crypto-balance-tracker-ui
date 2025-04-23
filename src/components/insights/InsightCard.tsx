import {CountUp} from "use-count-up";

const InsightCard = ({title, value, decimals, symbol}: {
  title: string,
  value: number,
  decimals: number,
  symbol: string
}) => {

  return (
    <div
      className="mb-8 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow text-left md:w-full xl:w-1/6 dark:bg-dark-1 dark:border-gray-500">
      <h5 className="w-full mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
        {
          title
        }
      </h5>
      <div className="font-semibold text-lg text-gray-700 dark:text-gray-300">
        {`${symbol} `}
        <CountUp
          isCounting
          end={value}
          duration={1.25}
          formatter={(value) => value.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        />
      </div>
    </div>
  );
}

export default InsightCard