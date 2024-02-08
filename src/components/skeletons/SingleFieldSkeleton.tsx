import React, {Fragment} from "react";

const SingleFieldSkeleton = ({label, id, classes}: {
  label: string,
  id: string,
  classes?: string
}) => {

  return(
    <Fragment>
      <label className="text-gray-900 block mb-2 text-sm font-medium"
             htmlFor={id}>
        {label}
      </label>
      <div className={`animate-pulse mx-auto h-10 bg-gray-300 rounded-md w-full ${classes}`}
           id={id}></div>
    </Fragment>
  );
}

export default SingleFieldSkeleton