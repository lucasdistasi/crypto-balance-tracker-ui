import React from "react";

const FormSkeleton = ({items}: {items: number}) => {

  return (
    <div className="animate-pulse w-1/2 mx-auto mt-10">
      {
        Array.from({ length: items }, (_, index) => (
          <div key={index} className="mb-10">
            <div className="h-10 bg-gray-300 rounded-md w-full"></div>
          </div>
        ))
      }
      <div className="flex items-center">
        <div className="h-10 mt-5 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md focus:ring-4 focus:ring-blue-300"></div>
      </div>
    </div>
  );
}

export default FormSkeleton