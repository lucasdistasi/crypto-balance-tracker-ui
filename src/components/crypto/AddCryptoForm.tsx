import AddButton from "../form/AddButton";
import PlatformDropdown from "./PlatformDropdown";

const AddCryptoForm = () => {

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        Add new Crypto
      </h1>
      <form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
        <div className="mb-6">
          <label htmlFor="base-input"
                 className="block mb-2 text-sm font-medium text-gray-900">
            Coin Name
          </label>
          <input type="text"
                 id="base-input"
                 className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        <div className="mb-6">
          <label htmlFor="base-input"
                 className="block mb-2 text-sm font-medium text-gray-900">
            Quantity
          </label>
          <input type="text"
                 id="base-input"
                 className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        <PlatformDropdown/>
        <AddButton text="Add Crypto"/>
      </form>
    </div>
  );
}

export default AddCryptoForm