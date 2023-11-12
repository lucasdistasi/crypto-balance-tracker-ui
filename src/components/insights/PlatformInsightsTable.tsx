import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";

const PlatformInsightsTable = ({platformInsightsResponse}: {
  platformInsightsResponse: PlatformInsightsResponse
}) => {

  return (
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
        </tr>
        </thead>
        <tbody>
        {
          platformInsightsResponse.cryptos.map(crypto => (
            <tr key={crypto.cryptoName} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
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
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default PlatformInsightsTable