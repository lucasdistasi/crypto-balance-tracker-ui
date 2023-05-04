const ChartSkeleton = () => {

  return (
    <div role="status"
         className="flex items-center justify-center my-7 h-96 w-11/12 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-600">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default ChartSkeleton