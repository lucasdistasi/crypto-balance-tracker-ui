const InsightsTitleSkeleton = () => {

  return (
    <div className="container flex flex-col justify-around mt-12 xl:flex-row">
      <div className="h-16 w-full bg-gray-300 rounded-lg animate-pulse xl:w-1/3 dark:bg-gray-600">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default InsightsTitleSkeleton