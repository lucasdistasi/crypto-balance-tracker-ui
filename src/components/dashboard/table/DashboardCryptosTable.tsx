import React, {Fragment, useEffect, useState} from "react";
import {CryptosBalancesResponse} from "../../../model/response/crypto/CryptosBalancesResponse";
import TotalBalanceCards from "./TotalBalanceCards";
import TableSkeleton from "../../skeletons/TableSkeleton";
import ErrorAlert from "../../page/ErrorAlert";
import {getAllCryptosDashboardService} from "../../../services/cryptoService";
import {TableColumnTitle} from "../../table/TableColumnTitle";
import {TableColumnContent} from "../../table/TableColumnContent";

const DashboardCryptosTable = () => {

  const [cryptosDashboard, setCryptosDashboard] = useState<CryptosBalancesResponse>({
    total_balance: 0n,
    total_EUR_balance: 0n,
    total_BTC_balance: 0n,
    cryptos: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await getAllCryptosDashboardService();
          setCryptosDashboard(response);
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
        !error && !loading && cryptosDashboard?.cryptos?.length == 0 &&
        <h1>
          No cryptos ...
        </h1>
      }

      {
        !error && !loading && cryptosDashboard?.cryptos?.length > 0 &&
        <Fragment>
          <TotalBalanceCards totalUsdValue={cryptosDashboard.total_balance}
                             totalEurValue={cryptosDashboard.total_EUR_balance}
                             totalBtcValue={cryptosDashboard.total_BTC_balance}/>
          <div className="relative overflow-x-auto sm:rounded-lg w-11/12 mb-8">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <TableColumnTitle title="Crypto"/>
                <TableColumnTitle title="Symbol"/>
                <TableColumnTitle title="Current Price"/>
                <TableColumnTitle title="Circulating Supply"/>
                <TableColumnTitle title="Max Supply"/>
                <TableColumnTitle title="Quantity"/>
                <TableColumnTitle title="Balance"/>
                <TableColumnTitle title="Percentage"/>
                <TableColumnTitle title="Platform"/>
              </tr>
              </thead>
              <tbody>
              {
                cryptosDashboard?.cryptos?.map(crypto => {
                  return (
                    <tr key={crypto.id}
                        className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
                      <TableColumnContent content={crypto.crypto_info.name}
                                          rowScope={true}/>
                      <TableColumnContent content={crypto.crypto_info.symbol.toUpperCase()}/>
                      <TableColumnContent content={`U$D ${crypto.crypto_info.market_data.current_price.usd}`}
                                          additionalClasses="whitespace-nowrap"/>
                      <TableColumnContent content={crypto.crypto_info.market_data.circulating_supply.toString()}/>
                      <TableColumnContent content={crypto.crypto_info.market_data.max_supply?.toString() ?? "∞"}/>
                      <TableColumnContent content={crypto.quantity.toString()}/>
                      <TableColumnContent content={`U$D ${crypto.balance}`}
                                          additionalClasses="whitespace-nowrap"/>
                      <TableColumnContent content={`${crypto.percentage}%`}/>
                      <TableColumnContent content={crypto.platform}/>
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