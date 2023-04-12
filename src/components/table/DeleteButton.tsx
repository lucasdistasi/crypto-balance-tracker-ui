import {Link} from "react-router-dom";

const DeleteButton = ({...props}) => {

  const {deleteLink} = props;

  return (
    <Link to={deleteLink}>
      <button type="button"
              className="sm:ml-0 lg:ml-1 w-32 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
        Delete
      </button>
    </Link>
  );
}

export default DeleteButton