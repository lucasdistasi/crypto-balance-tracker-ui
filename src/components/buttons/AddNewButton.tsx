import {Link} from "react-router-dom";

const AddNewButton = ({text, href}: { text: string, href: string }) => {

  return (
    <Link to={href}
          type="button"
          className="mt-10 w-1/2 text-black bg-green-300 hover:bg-green-400 hover:text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:text-white dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      <p className="font-bold">
        {
          text
        }
      </p>
    </Link>
  );
}

export default AddNewButton