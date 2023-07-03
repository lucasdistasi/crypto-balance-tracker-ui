import React, {Fragment} from "react";

const GoalProgress = ({progress, actualQuantity}: { progress: number, actualQuantity: string }) => {

  return (
    <Fragment>
      {
        progress >= 100 ?
          <Fragment>
            <p>
              &#11088; Achieved &#11088;
            </p>
          </Fragment>
          :
          <Fragment>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-blue-700 dark:text-white">
                {
                  `${progress}% (${actualQuantity})`
                }
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default GoalProgress