const RadialChartSkeleton = () => {

  return (
    <div className="container flex items-center justify-center mt-24">
      <div className="rounded-full mr-0 mb-24 h-56 w-56 bg-gray-300 animate-pulse dark:bg-gray-600 md:mr-24 md:h-96 md:w-96">
        <span className="sr-only">Loading...</span>
      </div>

      <output className="max-w-sm animate-pulse hidden md:block">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <span className="sr-only">Loading...</span>
      </output>
    </div>
  )
}

export default RadialChartSkeleton