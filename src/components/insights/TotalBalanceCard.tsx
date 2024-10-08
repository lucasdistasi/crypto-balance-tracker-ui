import {useSpring, animated} from "react-spring";

const CardAnimation = ({balance, decimals, symbol}: {
  balance: number,
  decimals: number,
  symbol: string
}) => {
  const {number} = useSpring({
    from: {
      number: 0
    },
    number: balance,
    delay: 50,
    config: {
      mass: 1,
      tension: 200,
      friction: 50,
    }
  });

  return <animated.div>{number.to(n => `${symbol} ${n.toFixed(decimals)}`)}</animated.div>
}

const TotalBalanceCard = ({title, value, decimals, symbol}: {
  title: string,
  value: number,
  decimals: number,
  symbol: string
}) => {

  return (
    <div
      className="xl:max-w mb-8 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow text-center dark:bg-gray-800 dark:border-gray-700">
      <h5 className="w-full mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {
          title
        }
      </h5>
      <div className="font-semibold text-2xl text-gray-700 dark:text-gray-400">
        {
          <CardAnimation balance={value} decimals={decimals} symbol={symbol}/>
        }
      </div>
    </div>
  );
}

export default TotalBalanceCard