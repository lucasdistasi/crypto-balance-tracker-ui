import {useCryptosPlatformsBalances} from "../../../hooks/useCryptosPlatformsBalances";
import React, {Fragment} from "react";
import TableSkeleton from "../../skeletons/TableSkeleton";
import ErrorAlert from "../../page/ErrorAlert";
import {TableColumnTitle} from "../../table/TableColumnTitle";
import {TableColumnContent} from "../../table/TableColumnContent";

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
        !error && !loading && response?.crypto_info_response?.length == 0 &&
        <h1>
          No cryptos ...
        </h1>
      }

      {
        !error && !loading && response?.crypto_info_response?.length > 0 &&
        <div className="relative overflow-x-auto sm:rounded-lg w-11/12 mb-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <TableColumnTitle title="Crypto"/>
              <TableColumnTitle title="Total Quantity"/>
              <TableColumnTitle title="Total Balance"/>
              <TableColumnTitle title="Total Percentage"/>
              <TableColumnTitle title="In Platforms"/>
            </tr>
            </thead>
            <tbody>
            {
              response.crypto_info_response.map(crypto => {
                return (
                  <tr key={crypto.name}
                      className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
                    <TableColumnContent content={crypto.name}
                                        rowScope={true}/>
                    <TableColumnContent content={crypto.quantity.toString()}/>
                    <TableColumnContent content={`U$D ${crypto.balance.toString()}`}
                                        additionalClasses="whitespace-nowrap"/>
                    <TableColumnContent content={`${crypto.percentage}%`}
                                        additionalClasses="font-medium text-gray-900 whitespace-nowrap dark:text-white"/>
                    <TableColumnContent content={crypto.platforms.join(" - ")}
                                        additionalClasses="whitespace-nowrap"/>
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