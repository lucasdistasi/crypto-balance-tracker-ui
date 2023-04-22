import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";
import {Fragment, useEffect, useState} from "react";
import Spinner from "../page/Spinner";
import ErrorAlert from "../page/ErrorAlert";
import Crypto from "../../model/Crypto";
import {CRYPTOS_ENDPOINT, getCryptosURL} from "../../constants/Constants";

const CryptosTable = () => {

  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(CRYPTOS_ENDPOINT)
      .then(response => {
        setLoading(true)

        if (response.status === 200) {
          return response.json();
        }
      })
      .then(data => {
        setCryptos(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      })
  }, []);

  function deleteCrypto(cryptoId: string) {
    const cryptosUrl = getCryptosURL(cryptoId);

    fetch(cryptosUrl, {
      method: "DELETE"
    })
      .then(response => {
        if (response.status === 204) {
          const updatedCryptos = cryptos.filter(crypto => crypto.coinId !== cryptoId);
          setCryptos(updatedCryptos);
        }
      });
  }

  return (
    <Fragment>
      {
        loading && <Spinner/>
      }

      {
        error && <ErrorAlert message="Error retrieving cryptos"/>
      }

      {
        cryptos && !loading && !error &&
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10 w-11/12">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col"
                  className="px-6 py-4 text-center">
                Coin
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
              cryptos.map(crypto => {
                const {coinId, coinName, platform, quantity} = crypto;

                return (
                  <tr key={coinId}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
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