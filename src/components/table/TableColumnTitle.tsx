import React from "react";

export const TableColumnTitle = ({title, additionalClasses}: {
  title: string,
  additionalClasses?: string
}) => {

  return (
    <th scope="col" className={additionalClasses ? `${additionalClasses} px-6 py-3` : 'px-6 py-3'}>
      {title}
    </th>
  );
}