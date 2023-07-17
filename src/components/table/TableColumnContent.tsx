import React from "react";

export const TableColumnContent = ({content, rowScope, additionalClasses}: {
  content: string,
  rowScope?: boolean,
  additionalClasses?: string
}) => {

  const defaultClasses = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";

  return rowScope ?
    <th scope="row" className={additionalClasses ? `${additionalClasses} ${defaultClasses}` : defaultClasses}>
      {content}
    </th>
    :
    <td className={additionalClasses ? `px-6 py-4 ${additionalClasses}` : 'px-6 py-4'}>
      {content}
    </td>
}