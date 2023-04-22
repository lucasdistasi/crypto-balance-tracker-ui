import ActionButton from "../form/ActionButton";
import PlatformDropdown from "./PlatformDropdown";
import Crypto from "../../model/Crypto";

const EditCryptoForm = (crypto: Crypto) => {

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        Edit Crypto
      </h1>
      <form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
        <div className="mb-6">
          <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">
            Coin Name
          </label>
          <input type="text"
                 id="disabled-input-2"
                 defaultValue={crypto?.coinName}
                 aria-label="disabled input"
                 className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
                 disabled readOnly/>
        </div>
        <div className="mb-6">
          <label htmlFor="base-input"
                 className="block mb-2 text-sm font-medium text-gray-900">
            Quantity
          </label>
          <input type="text"
                 id="base-input"
                 defaultValue={crypto?.quantity ? crypto.quantity.toString() : ""}
                 className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        <PlatformDropdown platform={crypto?.platform}/>
        <ActionButton text="Edit Crypto"/>
      </form>
    </div>
  );
}

export default EditCryptoForm