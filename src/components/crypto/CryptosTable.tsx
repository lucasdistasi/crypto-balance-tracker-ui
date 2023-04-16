import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";

const CryptosTable = () => {

  const arr: Array<String> = ["a", "b", "c", "d"]

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10 w-11/12 min-h-screen">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-4 text-center">
            Coin
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Quantity
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Platform
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        {
          arr.map(crypto => (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                Bitcoin
              </th>
              <td className="px-6 py-4 text-center">
                {
                  "999999999999999.999999999999999"
                }
              </td>
              <td className="px-6 py-4 text-center">
                {
                  "Binance".toUpperCase()
                }
              </td>
              <td className="px-6 py-4 text-center">
                <EditButton editLink={`/crypto/${crypto}`}/>
                <DeleteButton deleteLink={`/crypto/${crypto}`}/>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default CryptosTable