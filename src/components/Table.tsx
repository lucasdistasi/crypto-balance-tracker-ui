import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";

const Table = () => {

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-4">
            Product name
          </th>
          <th scope="col" className="px-6 py-4">
            Color
          </th>
          <th scope="col" className="px-6 py-4">
            Category
          </th>
          <th scope="col" className="px-6 py-4">
            Price
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Apple MacBook Pro 17"
          </th>
          <td className="px-6 py-4">
            Silver
          </td>
          <td className="px-6 py-4">
            Laptop
          </td>
          <td className="px-6 py-4">
            $2999
          </td>
          <td className="px-6 py-4 text-center">
            <EditButton/>
            <DeleteButton/>
          </td>
        </tr>
        <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Apple Watch 5
          </th>
          <td className="px-6 py-4">
            Red
          </td>
          <td className="px-6 py-4">
            Wearables
          </td>
          <td className="px-6 py-4">
            $999
          </td>
          <td className="px-6 py-4 text-center">
            <EditButton/>
            <DeleteButton/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table