import React from "react";

const CardsInsightsSkeleton = () => {

  return (
    <div className="container mt-20 mb-10 flex justify-center items-center mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({length: 8}).map((_, index) => (
          <div key={index}
            className="h-[600px] mb-10 w-72 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-600 xl:mb-0">
            <span className="sr-only">Loading...</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsInsightsSkeleton