import {Link} from "react-router-dom";
import React, {Fragment} from "react";
import {retrieveCryptosPlatformsInsightsByPage} from "../../services/insightsService";
import {usePageUserCryptosInsightsResponse} from "../../hooks/usePageUserCryptosInsightsResponse";
import CryptoInsightsCard from "./CryptoInsightsCard";

const CryptosPlatformsInsightsCards = () => {

  const {
    pageUserCryptosInsightsResponse,
    filteredCryptos,
    page,
    error,
    loading,
    isLoadingMore,
    loadMoreCryptos,
    filterTable
  } = usePageUserCryptosInsightsResponse(() => retrieveCryptosPlatformsInsightsByPage(0))

  return (
    <Fragment>
      {
        (pageUserCryptosInsightsResponse.cryptos === undefined || pageUserCryptosInsightsResponse.cryptos?.length === 0) &&
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3 my-8 w-10/12"
               role="alert">
            <p className="font-bold">No Cryptos found</p>
            <p className="text-sm">
              Looks like you've no cryptos added. Go to <Link to="/crypto"><span className="font-bold italic">this link</span></Link> to
              add a crypto and start viewing insights.
            </p>
          </div>
        </div>
      }

      {
        !error && !loading && pageUserCryptosInsightsResponse.cryptos?.length > 0 &&
        <div className="container mx-auto mt-20 mb-10">
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
                     className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full lg:w-2/4 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search by crypto name or symbol/ticker"
                     onChange={event => filterTable(event)}
                     maxLength={64}/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {
              filteredCryptos.current.map((crypto) => (
                <div key={crypto.cryptoInfo.cryptoId}
                     className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-5">
                  <CryptoInsightsCard crypto={crypto}/>
                </div>
              ))
            }
          </div>
        </div>
      }

      {
        !error && !loading && pageUserCryptosInsightsResponse.hasNextPage && (
          <div className="w-9/12 mx-auto mb-10">
            <button
              type="button"
              className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center"
              onClick={() => loadMoreCryptos(retrieveCryptosPlatformsInsightsByPage(page + 1))}
            >
              Load more

              {
                isLoadingMore &&
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 ml-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              }
            </button>
          </div>
        )
      }

    </Fragment>
  );
}

export default CryptosPlatformsInsightsCards