const TotalBalancesCardsSkeleton = () => {

  return (
    <div className="container flex flex-col justify-around mt-24 xl:flex-row">
      <div className="h-28 w-full mb-10 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-600 xl:h-28 xl:w-56 xl:mb-0">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="h-28 w-full mb-10 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-600 xl:h-28 xl:w-56 xl:mb-0">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="h-28 w-full mb-10 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-600 xl:h-28 xl:w-56 xl:mb-0">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default TotalBalancesCardsSkeleton