import FilterField from "../commons/FilterField";
import SortCryptosInsights from "./SortCryptosInsights";
import React, {Fragment} from "react";

const InsightsSortFilterComponent = ({filterFunction, filterValue, updateSortBy, updateSortType, retrieveSortedResults}: {
  filterFunction: (e: React.ChangeEvent<HTMLInputElement>) => void,
  filterValue: string,
  updateSortBy: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  updateSortType: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  retrieveSortedResults: () => void,
}) => {

  return (
    <Fragment>
      <FilterField filterFunction={filterFunction}
                   filterValue={filterValue}
                   placeHolder="Search by crypto name or symbol/ticker"/>

      <SortCryptosInsights updateSortBy={updateSortBy}
                           updateSortType={updateSortType}
                           retrieveSortedResults={retrieveSortedResults}/>
    </Fragment>
  )
}

export default InsightsSortFilterComponent