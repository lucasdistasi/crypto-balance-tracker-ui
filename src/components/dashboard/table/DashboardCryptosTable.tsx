import React, {Fragment, useEffect, useState} from "react";
import {ALL_CRYPTOS_DASHBOARD_ENDPOINT} from "../../../constants/Constants";
import {CryptosBalancesResponse} from "../../../response/crypto/CryptosBalancesResponse";
import TotalBalanceCards from "./TotalBalanceCards";
import axios from "axios";
import TableSkeleton from "../../skeletons/TableSkeleton";
import ErrorAlert from "../../page/ErrorAlert";

const DashboardCryptosTable = () => {

  const [cryptosDashboard, setCryptosDashboard] = useState<CryptosBalancesResponse>({
    totalBalance: 0n,
    totalEURBalance: 0n,
    totalBTCBalance: 0n,
    coins: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await axios.get(ALL_CRYPTOS_DASHBOARD_ENDPOINT);
          setCryptosDashboard(response.data);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

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
        !error && !loading && cryptosDashboard?.coins?.length == 0 &&
        <h1>
          No cryptos ...
        </h1>
      }

      {
        !error && !loading && cryptosDashboard?.coins?.length > 0 &&
        <Fragment>
          <TotalBalanceCards totalUsdValue={cryptosDashboard.totalBalance}
                             totalEurValue={cryptosDashboard.totalEURBalance}
                             totalBtcValue={cryptosDashboard.totalBTCBalance}/>
          <div className="relative overflow-x-auto sm:rounded-lg w-11/12 mb-8">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Symbol
                </th>
                <th scope="col" className="px-6 py-3">
                  Current Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Circulating Supply
                </th>
                <th scope="col" className="px-6 py-3">
                  Max Supply
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Balance
                </th>
                <th scope="col" className="px-6 py-3">
                  Percentage
                </th>
                <th scope="col" className="px-6 py-3">
                  Platform
                </th>
              </tr>
              </thead>
              <tbody>
              {
                cryptosDashboard?.coins?.map(crypto => {
                  return (
                    <tr key={crypto.coin_id} className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {
                          crypto.coin_info.name
                        }
                      </th>
                      <td className="px-6 py-4">
                        {
                          crypto.coin_info.symbol.toUpperCase()
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {
                          `U$D ${crypto.coin_info.market_data.current_price.usd}`
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          crypto.coin_info.market_data.circulating_supply.toString()
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          crypto.coin_info.market_data.max_supply?.toString() ?? "∞"
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          crypto.quantity
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {
                          `U$D ${crypto.balance}`
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          `${crypto.percentage}%`
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          crypto.platform
                        }
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </Fragment>
      }
    </Fragment>
  );
}

export default DashboardCryptosTable