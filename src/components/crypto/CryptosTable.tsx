import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";
import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import {Crypto} from "../../model/Crypto";
import {CRYPTOS_ENDPOINT, getCryptosURL} from "../../constants/Constants";
import axios from "axios";
import TableSkeleton from "../skeletons/TableSkeleton";

const CryptosTable = () => {

  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const {data} = await axios.get(CRYPTOS_ENDPOINT);
          setCryptos(data);
          setFilteredCryptos(data);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

  const deleteCrypto = async (cryptoId: string) => {
    const cryptosUrl = getCryptosURL(cryptoId);

    try {
      await axios.delete(cryptosUrl);
      const updatedCryptos = cryptos.filter(crypto => crypto.coinId !== cryptoId);
      setCryptos(updatedCryptos);
    } catch (err) {
      setError(true);
    }
  }

  const filterTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredCryptos = cryptos.filter(crypto => crypto.coinName.toUpperCase().startsWith(value.toUpperCase()) || crypto.platform.toUpperCase().startsWith(value.toUpperCase()));

    setFilteredCryptos(filteredCryptos);
  }

  return (
    <Fragment>
      {
        loading && !error &&
        <TableSkeleton/>
      }

      {
        error && !loading &&
        <ErrorAlert message="Error retrieving cryptos"/>
      }

      {
        !error && !loading && cryptos?.length > 0 &&
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10 w-11/12">
          <div className="bg-white mb-2">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400"
                     aria-hidden="true"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"/>
                </svg>
              </div>
              <input type="text"
                     id="table-search"
                     className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full lg:w-2/5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search by crypto or platform"
                     onChange={event => filterTable(event)}/>
            </div>
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col"
                  className="px-6 py-4 text-center">
                Crypto
              </th>
              <th scope="col"
                  className="px-6 py-4 text-center">
                Quantity
              </th>
              <th scope="col"
                  className="px-6 py-4 text-center">
                Platform
              </th>
              <th scope="col"
                  className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            {
              filteredCryptos.map(crypto => {
                const {coinId, coinName, platform, quantity} = crypto;

                return (
                  <tr key={coinId}
                      className="bg-white border-b dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {
                        coinName
                      }
                    </th>
                    <td className="px-6 py-4 text-center">
                      {
                        quantity.toString()
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      {
                        platform
                      }
                    </td>
                    <td
                      className="px-6 py-4 text-center flex flex-col justify-center space-y-2 lg:space-y-0 lg:space-x-4 lg:flex-row">
                      <EditButton editLink={`/crypto/${coinId}`}/>
                      <DeleteButton deleteFunction={() => deleteCrypto(coinId)}
                                    deleteId={coinId}
                                    deleteMessage={`Are you sure you want to delete ${coinName.toUpperCase()} in ${platform}?`}/>
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

export default CryptosTable