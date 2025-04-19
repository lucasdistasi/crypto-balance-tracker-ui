import React from "react";

type CustomTableProps = {
  thead: React.ReactNode;
  tbody: React.ReactNode;
};

const Table: React.FC<CustomTableProps> = ({thead, tbody}) => {

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
      {thead}
      </thead>
      <tbody>
      {tbody}
      </tbody>
    </table>
  )
}

export default Table;