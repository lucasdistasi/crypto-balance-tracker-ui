import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";
import EditButton from "../table/EditButton";
import TransferButton from "../table/TransferButton";
import DeleteButton from "../table/DeleteButton";
import {Fragment} from "react";

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
                Crypto
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Percentage
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                USD Balance
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                EUR Balance
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                BTC Balance
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap text-center">
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            {
              cryptos.map(crypto => (
                <tr key={crypto.cryptoName} className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {
                      crypto.cryptoName
                    }
                  </th>
                  <td className="px-6 py-4">
                    {
                      crypto.quantity
                    }
                  </td>
                  <td className="px-6 py-4">
                    {
                      `${crypto.percentage}%`
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {
                      `$ ${crypto.balances.totalUSDBalance}`
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {
                      `€ ${crypto.balances.totalEURBalance}`
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {
                      `₿ ${crypto.balances.totalBTCBalance}`
                    }
                  </td>

                  <td
                    className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                    <EditButton editLink={`/crypto/${crypto.id}?redirectTo=${window.location.pathname}`}/>
                    <TransferButton transferLink={`/transfer/${crypto.id}?redirectTo=${window.location.pathname}`}/>
                    <DeleteButton deleteFunction={() => deleteCryptoFunction(crypto.id!!)}
                                  deleteId={crypto.id!}
                                  deleteMessage={`Are you sure you want to delete ${crypto.cryptoName.toUpperCase()} in ${platformName}?`}/>
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