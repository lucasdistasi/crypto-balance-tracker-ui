import {Link, NavLink} from "react-router-dom";
import {useEffect} from "react";
import {initFlowbite} from "flowbite";
import DarkModeToggle from "../commons/DarkModeToggle";

const Navbar = () => {

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <nav className="bg-gray-200 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <img src="/bitcoin.svg" className="mr-3 h-8" alt="Bitcoin Logo"/>
          <span
            className="self-center whitespace-nowrap hidden text-lg font-semibold dark:text-white xs:block md:text-2xl">
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
          <ul className="flex flex-col items-center rounded-lg border border-gray-400 bg-gray-200 p-4 font-medium md:space-x-8 md:mt-0 md:flex-row md:border-0 md:p-0 dark:border-gray-700 dark:bg-gray-900">
            <li>
              <NavLink to="/"
                       className="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 dark:text-white md:border-0 md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Home
              </NavLink>
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-center w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent sm:flex sm:justify-center">
                Cryptos
                <svg className="w-2.5 h-2.5 ml-2.5 sm:ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <div id="dropdownNavbar"
                   className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <NavLink to="/cryptos"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Cryptos
                  </NavLink>
                  <NavLink to="/insights/cryptos"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Cryptos Insights
                  </NavLink>
                  <NavLink to="/insights/cryptos-platforms"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Cryptos Platforms Insights
                  </NavLink>
                </ul>
              </div>
            </li>
            <li>
              <NavLink to="/platforms"
                       className="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 dark:text-white md:border-0 md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Platforms
              </NavLink>
            </li>
            <li>
              <NavLink to="/goals"
                       className="block rounded py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 dark:text-white md:border-0 md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                Goals
              </NavLink>
            </li>
            <li>
              <DarkModeToggle/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar