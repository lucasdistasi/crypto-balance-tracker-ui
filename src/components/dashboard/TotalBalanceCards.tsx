import TotalBalanceCard from "./TotalBalanceCard";

const TotalBalanceCards = ({...props}) => {

  const {totalUsdValue, totalEurValue, totalBtcValue} = props;

  return (
    <div className="xl:flex-row flex flex-col w-11/12 justify-center justify-around mt-10">
      <TotalBalanceCard title={"Total portfolio value in USD"}
                        value={`U$D ${totalUsdValue}`}/>
      <TotalBalanceCard title={"Total portfolio value in EUR"}
                        value={`€ ${totalEurValue}`}/>
      <TotalBalanceCard title={"Total portfolio value in BTC"}
                        value={`₿ ${totalBtcValue}`}/>
    </div>
  );
}

export default TotalBalanceCards