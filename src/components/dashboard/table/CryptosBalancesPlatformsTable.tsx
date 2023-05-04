import {useCryptosPlatformsBalances} from "../../../hooks/useCryptosPlatformsBalances";
import React, {Fragment} from "react";
import TableSkeleton from "../../skeletons/TableSkeleton";
import ErrorAlert from "../../page/ErrorAlert";

const CryptosBalancesPlatformsTable = () => {

  const {response, error, loading} = useCryptosPlatformsBalances();

  return (
    <Fragment>
      {
        loading && !error &&
        <TableSkeleton/>
      }

      {
        error && !loading &&
        <ErrorAlert/>
      }

      {
        !error && !loading && response?.coinInfoResponse?.length == 0 &&
        <h1>
          No cryptos ...
        </h1>
      }

      {
        !error && !loading && response?.coinInfoResponse?.length > 0 &&
          <div className="relative overflow-x-auto sm:rounded-lg w-11/12 mb-8">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Balance
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Percentage
                </th>
                <th scope="col" className="px-6 py-3">
                  In Platforms
                </th>
              </tr>
              </thead>
              <tbody>
              {
                response?.coinInfoResponse?.map(crypto => {

                  return (
                    <tr key={crypto.name} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {
                          crypto.name
                        }
                      </th>
                      <td className="px-6 py-4">
                        {
                          crypto.quantity.toString()
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {
                          `U$D ${crypto.balance.toString()}`
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          `${crypto.percentage}%`
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          crypto.platforms.join(" - ")
                        }
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

export default CryptosBalancesPlatformsTable