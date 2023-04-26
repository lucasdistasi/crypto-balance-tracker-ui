const TotalBalanceCard = ({...props}) => {

  const {totalUsdValue, totalEurValue, totalBtcValue} = props;

  return (
    <div className="xl:flex-row flex flex-col justify-center justify-around">

      <div className="xl:max-w mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
        <h5 className="w-full mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total portfolio value in USD
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {
            `U$D ${totalUsdValue}`
          }
        </p>
      </div>

      <div className="xl:max-w mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total portfolio value in EUR
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {
            `€ ${totalEurValue}`
          }
        </p>
      </div>

      <div className="xl:max-w mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total portfolio value in BTC
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {
            `₿ ${totalBtcValue}`
          }
        </p>
      </div>

    </div>
  );
}

export default TotalBalanceCard