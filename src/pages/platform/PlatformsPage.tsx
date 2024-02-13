import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddNewButton from "../../components/buttons/AddNewButton";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useState} from "react";
import {usePlatforms} from "../../hooks/usePlatforms";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import ErrorAlert from "../../components/page/ErrorAlert";
import {SortableTableColumnTitle} from "../../components/table/SortableTableColumnTitle";
import {TableColumnTitle} from "../../components/table/TableColumnTitle";
import {TableColumnContent} from "../../components/table/TableColumnContent";
import EditButton from "../../components/table/EditButton";
import {ViewInsightsButton} from "../../components/table/ViewInsightsButton";
import DeleteButton from "../../components/table/DeleteButton";

const PlatformsPage = () => {

  const {
    platforms,
    setPlatforms,
    error,
    isLoadingPlatforms,
    deletePlatform
  } = usePlatforms();
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
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <AddNewButton text="+ Add New Platform" href="/platform"/>
        {
          isLoadingPlatforms && !error &&
          <TableSkeleton/>
        }

        {
          error && !isLoadingPlatforms &&
          <ErrorAlert message="Error retrieving platforms"/>
        }

        {
          !error && !isLoadingPlatforms && platforms?.length > 0 &&
          <div className="relative overflow-x-auto rounded-lg m-10 w-11/12">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <SortableTableColumnTitle title="Name"
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
                      className="bg-gray-100 border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
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
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(PlatformsPage)