import {Link} from "react-router-dom";

const TransferButton = ({transferLink}: { transferLink: string }) => {

  return (
    <Link to={transferLink}>
      <button type="button"
              className="w-32 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-hidden focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
        Transfer
      </button>
    </Link>
  );
}

export default TransferButton