import {Link} from "react-router-dom";

const EditButton = ({editLink}: {
  editLink: string
}) => {

  return (
    <Link to={editLink}>
      <button type="button"
              className="w-32 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
        Edit
      </button>
    </Link>
  );
}

export default EditButton