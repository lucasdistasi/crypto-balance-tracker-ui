import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";
import React, {Fragment, useEffect, useState} from "react";
import ErrorAlert from "../page/ErrorAlert";
import {Crypto} from "../../model/response/crypto/Crypto";
import {getCryptosURL, getPageCryptosURL} from "../../constants/Constants";
import axios from "axios";
import TableSkeleton from "../skeletons/TableSkeleton";
import {PageCryptoResponse} from "../../model/response/crypto/PageCryptoResponse";

const CryptosTable = () => {

  const [pageCryptoResponse, setPageCryptoResponse] = useState<PageCryptoResponse>({
    cryptos: [],
    hasNextPage: false,
    page: 0,
    totalPages: 0
  });
  const [filteredCryptos, setFilteredCryptos] = useState<Array<Crypto>>([]);
  const [filterValue, setFilterValue] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        const cryptosURL = getPageCryptosURL(page);

        try {
          const {data} = await axios.get(cryptosURL);
          setPageCryptoResponse(data);
          setFilteredCryptos(data.cryptos);
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
      const updatedFilteredCryptos = filteredCryptos.filter(crypto => crypto.coinId !== cryptoId);
      const updatedCryptos = pageCryptoResponse.cryptos.filter(crypto => crypto.coinId !== cryptoId);
      const {hasNextPage, page, totalPages} = pageCryptoResponse;

      setPageCryptoResponse({
        cryptos: updatedCryptos,
        hasNextPage,
        page,
        totalPages
      });
      setFilteredCryptos(updatedFilteredCryptos);
    } catch (err) {
      setError(true);
    }
  }

  const filterTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredCryptos = pageCryptoResponse.cryptos.filter(crypto => doesMatchFilter(crypto, value));

    setFilteredCryptos(filteredCryptos);
    setFilterValue(value);
  }

  const loadMore = async () => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    const cryptosURL = getPageCryptosURL(nextPage);

    try {
      const {data}: { data: PageCryptoResponse } = await axios.get(cryptosURL);
      const allFiltered = [...filteredCryptos, ...data.cryptos.filter((crypto) => doesMatchFilter(crypto, filterValue))]

      setFilteredCryptos(allFiltered);
      setPageCryptoResponse({
        cryptos: [...pageCryptoResponse.cryptos, ...data.cryptos],
        hasNextPage: data.hasNextPage,
        page: data.page,
        totalPages: data.totalPages
      });
    } catch (err) {
      setError(true);
    } finally {
      setIsLoadingMore(false);
    }
  }

  const doesMatchFilter = (crypto: Crypto, value: string) => {
    return crypto.coinName.toUpperCase().startsWith(value.toUpperCase()) ||
      crypto.platform.toUpperCase().startsWith(value.toUpperCase());
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
        !error && !loading && pageCryptoResponse.cryptos.length > 0 &&
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

      {
        !error && !loading && pageCryptoResponse.hasNextPage &&
        <button type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-10 w-1/2"
                onClick={loadMore}>
          Load more

          {
            isLoadingMore &&
            <svg aria-hidden="true"
                 role="status"
                 className="inline w-4 h-4 ml-3 text-white animate-spin"
                 viewBox="0 0 100 101"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"/>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"/>
            </svg>
          }

        </button>
      }
    </Fragment>
  );
}

export default CryptosTable