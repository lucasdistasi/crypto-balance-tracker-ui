import {Link, useRouteError} from "react-router-dom";

const NotFound = () => {

  //const {status}: any = useRouteError();

  return (
    <div className="text-center bg-gray-100 flex flex-col items-center justify-center h-screen">
      <img src="https://via.placeholder.com/300x300" alt="Error 404" className="mx-auto"/>
      <h1 className="text-2xl font-bold mt-6">
        ¡Oops! Page was not found
      </h1>
      <p className="text-gray-500 mt-2 mb-10">
        You are currently in a limbo.
      </p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
        Take me back home
      </Link>
    </div>
  );
}

export default NotFound