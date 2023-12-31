import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";
import React, {Fragment, useState} from "react";
import Spinner from "../page/Spinner";
import ErrorAlert from "../page/ErrorAlert";
import {usePlatforms} from "../../hooks/usePlatforms";
import {TableColumnTitle} from "../table/TableColumnTitle";
import {TableColumnContent} from "../table/TableColumnContent";
import {ViewInsightsButton} from "../table/ViewInsightsButton";
import {SortedTableColumnTitle} from "../table/SortedTableColumnTitle";

const PlatformsTable = () => {

  const {platforms, setPlatforms, error, loading, deletePlatform} = usePlatforms();
  const [sortAscending, setSortAscending] = useState(true);

  const sortByPlatformName = () => {
    let sortedPlatforms = platforms.toSorted((a, b) => {
      if (a.name > b.name) {
        return sortAscending ? 1 : -1;
      }

      if (b.name > a.name) {
        return sortAscending ? -1 : 1;
      }

      return 0;
    });
    setPlatforms(sortedPlatforms)
    setSortAscending(!sortAscending);
  }

  return (
    <Fragment>
      {
        loading && !error &&
        <Spinner/>
      }

      {
        error && !loading &&
        <ErrorAlert message="Error retrieving platforms"/>
      }

      {
        !error && !loading && platforms?.length > 0 &&
        <div className="relative overflow-x-auto sm:rounded-lg m-10 w-11/12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <SortedTableColumnTitle title="Name"
                                      additionalClasses="text-center"
                                      sortFunction={sortByPlatformName}/>
              <TableColumnTitle title="Action"
                                additionalClasses="text-center"/>
            </tr>
            </thead>
            <tbody>
            {
              platforms.map(platform => {
                const {id: platformId, name: platformName} = platform;

                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                    key={platformName}>
                    <TableColumnContent content={platformName}
                                        rowScope={true}
                                        additionalClasses="text-center"/>
                    <td
                      className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                      <EditButton editLink={`/platform/${platformId}`}/>
                      <ViewInsightsButton viewInsightsLink={`/insights/platform/${platformId}`}/>
                      <DeleteButton deleteFunction={() => deletePlatform(platformId)}
                                    deleteId={platformId}
                                    deleteMessage={`Are you sure you want to delete ${platformName}? All cryptos in ${platformName} will be deleted too!`}/>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      }
    </Fragment>
  );
}

export default PlatformsTable