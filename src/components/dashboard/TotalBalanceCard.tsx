const TotalBalanceCard = ({title, value}: {title: string, value: string}) => {

  return (
    <div className="xl:max-w mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
      <h5 className="w-full mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {
          title
        }
      </h5>
      <p className="font-semibold text-2xl text-gray-700 dark:text-gray-400">
        {
          value
        }
      </p>
    </div>
  );
}

export default TotalBalanceCard