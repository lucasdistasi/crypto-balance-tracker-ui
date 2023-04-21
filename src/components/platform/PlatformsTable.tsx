import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";
import {Fragment} from "react";
import Spinner from "../page/Spinner";
import ErrorAlert from "../page/ErrorAlert";
import {usePlatforms} from "../../hooks/usePlatforms";

const PlatformsTable = () => {

  const {platforms, error, loading} = usePlatforms();

  return (
    <Fragment>
      {
        loading && <Spinner/>
      }

      {
        error && <ErrorAlert message="Error retrieving platforms"/>
      }

      {
        platforms && !error && !loading &&
        <div className="relative overflow-x-auto sm:rounded-lg m-10 w-11/12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            {
              platforms.map(platform => {
                const {name: platformName} = platform;

                return (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={platformName}>
                    <th scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {
                        platformName.toUpperCase()
                      }
                    </th>
                    <td
                      className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                      <EditButton editLink={`/platform/${platformName}`}/>
                      <DeleteButton deleteLink={`/platform/${platformName}`}/>
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