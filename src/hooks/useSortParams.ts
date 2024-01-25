import React, {useState} from "react";
import {SortBy} from "../enums/SortBy";
import {SortType} from "../enums/SortType";

export function useSortParams() {

  const [sortParams, setSortParams] = useState({
    sortBy: SortBy.PERCENTAGE,
    sortType: SortType.DESCENDING
  });

  const updateSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (Object.values(SortBy).includes(value as SortBy)) {
      setSortParams({
        ...sortParams,
        sortBy: value as SortBy
      });
    } else {
      setSortParams({
        ...sortParams,
        sortBy: SortBy.PERCENTAGE
      });
    }
  }

  const updateSortType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (Object.values(SortType).includes(value as SortType)) {
      setSortParams({
        ...sortParams,
        sortType: value as SortType
      });
    } else {
      setSortParams({
        ...sortParams,
        sortType: SortType.DESCENDING
      });
    }
  }

  return {
    sortParams,
    updateSortBy,
    updateSortType
  }
}