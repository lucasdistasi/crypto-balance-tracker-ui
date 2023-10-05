import TotalBalanceCard from "./TotalBalanceCard";

const TotalBalanceCards = ({...props}) => {

  const {totalUsdValue, totalEurValue, totalBtcValue} = props;
  const btcDecimals = Number(String(totalBtcValue).split(".")[1]?.length) || 2;

  return (
    <div className="xl:flex-row flex flex-col w-11/12 justify-around mt-10">
      <TotalBalanceCard title={"Total value in USD"}
                        value={totalUsdValue}
                        decimals={2}
                        symbol="$"/>
      <TotalBalanceCard title={"Total value in EUR"}
                        value={totalEurValue}
                        decimals={2}
                        symbol="€"/>
      <TotalBalanceCard title={"Total value in BTC"}
                        value={totalBtcValue}
                        decimals={btcDecimals}
                        symbol="₿"/>
    </div>
  );
}

export default TotalBalanceCards