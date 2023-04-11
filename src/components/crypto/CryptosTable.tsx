import EditButton from "../table/EditButton";
import DeleteButton from "../table/DeleteButton";

const CryptosTable = () => {

  const arr: Array<String> = ["a", "b", "c", "d"]

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10 w-11/12">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-4 text-center">
            Symbol
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Name
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Current Price
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Total Supply
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Max Supply
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Quantity
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Balance
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Percentage
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
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4 text-center">
                Silver
              </td>
              <td className="px-6 py-4 text-center">
                Silver
              </td>
              <td className="px-6 py-4 text-center">
                Silver
              </td>
              <td className="px-6 py-4 text-center">
                Silver
              </td>
              <td className="px-6 py-4 text-center">
                Silver
              </td>
              <td className="px-6 py-4 text-center">
                Silver
              </td>
              <td className="px-6 py-4 text-center">
                Laptop
              </td>
              <td className="px-6 py-4 text-center">
                $2999
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