import {CryptoInsightResponse} from "../../model/response/insight/CryptoInsightResponse";
import Table from "../table/Table";

const CryptoInsightsTable = ({cryptoInsightResponse}: {
  cryptoInsightResponse: CryptoInsightResponse
}) => {

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto mb-20 w-11/12">
      <Table
        thead={
          <tr>
            <th scope="col" className="px-6 py-3">
              Platform
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
        }
        tbody={
          cryptoInsightResponse.platforms.map(platform => (
            <tr key={platform.platformName}
                className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-800  dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {
                  platform.platformName
                }
              </th>
              <td className="px-6 py-4">
                {
                  platform.quantity
                }
              </td>
              <td className="px-6 py-4">
                {
                  `${platform.percentage}%`
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
                  `$ ${platform.balances.fiat.usd}`
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
                  `€ ${platform.balances.fiat.eur}`
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
                  `₿ ${platform.balances.btc}`
                }
              </td>
            </tr>
          ))
        }
      />
    </div>
  )
}

export default CryptoInsightsTable