import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";
import EditButton from "../table/EditButton";
import TransferButton from "../table/TransferButton";
import DeleteButton from "../table/DeleteButton";
import React, {Fragment} from "react";

const PlatformInsightsTable = ({platformInsightsResponse, deleteCryptoFunction}: {
  platformInsightsResponse: PlatformInsightsResponse,
  deleteCryptoFunction: (cryptoId: string) => Promise<void>
}) => {

  const platformName = platformInsightsResponse.platformName;
  const cryptos = platformInsightsResponse.cryptos;

  return (
    <Fragment>
      {
        cryptos.length > 0 &&
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto mb-20 w-11/12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Crypto
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Percentage
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Balance
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap text-center">
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            {
              cryptos.map((crypto, index) => (
                <tr key={crypto.cryptoInfo.cryptoId}
                    className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                      <img className="w-10 h-10 rounded-full" src={crypto.cryptoInfo.image}
                           alt={`${crypto.cryptoInfo.cryptoName} logo`}/>
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {crypto.cryptoInfo.symbol.toUpperCase()}
                        </div>
                        <div
                          className="font-normal text-gray-500 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {crypto.cryptoInfo.cryptoName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {crypto.quantity}
                  </td>
                  <td className="px-6 py-4">
                    {`${crypto.percentage}%`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`$ ${crypto.balances.totalUSDBalance}`}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                      <EditButton editLink={`/crypto/${crypto.id}?redirectTo=${window.location.pathname}`}/>
                      <TransferButton transferLink={`/transfer/${crypto.id}?redirectTo=${window.location.pathname}`}/>
                      <DeleteButton deleteFunction={() => deleteCryptoFunction(crypto.id)}
                                    deleteId={crypto.id}
                                    deleteMessage={`Are you sure you want to delete ${crypto.cryptoInfo.cryptoName.toUpperCase()} in ${platformName}?`}/>
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      }
    </Fragment>
  )
}

export default PlatformInsightsTable