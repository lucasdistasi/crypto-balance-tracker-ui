import {useSpring, animated} from "react-spring";

const Number = ({...props}) => {
  const {n, decimals, symbol} = props;

  const {number} = useSpring({
    from: {
      number: 0
    },
    number: n,
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
  value: string,
  decimals: number,
  symbol: string
}) => {

  return (
    <div className="xl:max-w mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
      <h5 className="w-full mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {
          title
        }
      </h5>
      <div className="font-semibold text-2xl text-gray-700 dark:text-gray-400">
        {
          <Number n={value} decimals={decimals} symbol={symbol}/>
        }
      </div>
    </div>
  );
}

export default TotalBalanceCard