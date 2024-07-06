import FilterField from "../commons/FilterField";
import SortCryptosInsights from "./SortCryptosInsights";
import React, {Fragment} from "react";

const InsightsSortFilterComponent = (props: any) => {

  return (
    <Fragment>
      <FilterField filterFunction={props.filterFunction}
                   filterValue={props.filterValue}
                   placeHolder="Search by crypto name or symbol/ticker"/>

      <SortCryptosInsights updateSortBy={props.updateSortBy}
                           updateSortType={props.updateSortType}
                           retrieveSortedResults={props.retrieveSortedResults}/>
    </Fragment>
  )
}

export default InsightsSortFilterComponent