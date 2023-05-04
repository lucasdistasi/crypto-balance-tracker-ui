import {Link, NavLink} from "react-router-dom";
import {useEffect} from "react";
import {initFlowbite} from "flowbite";

const Navbar = () => {

  useEffect(() => {
  initFlowbite();
  }, []);

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <img src="/bitcoin.svg" className="mr-3 h-8" alt="Bitcoin Logo"/>
          <span className="self-center whitespace-nowrap hidden text-lg font-semibold dark:text-white xs:block md:text-2xl">
            Crypto Balance Tracker
          </span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button"
                className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 md:hidden dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto text-center" id="navbar-default">
          <ul
            className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:space-x-8 md:mt-0 md:flex-row md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <NavLink to="/"
                       className="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 dark:text-white md:border-0 md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/cryptos"
                       className="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 dark:text-white md:border-0 md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Cryptos
              </NavLink>
            </li>
            <li>
              <NavLink to="/platforms"
                       className="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 dark:text-white md:border-0 md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Platforms
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar