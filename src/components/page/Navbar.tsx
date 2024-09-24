import {Link, NavLink} from "react-router-dom";
import {useEffect} from "react";
import {initFlowbite} from "flowbite";
import DarkModeToggle from "../commons/DarkModeToggle";
import NavbarBurgerButton from "./NavbarBurgerButton";
import NavbarSimpleLink from "./NavbarSimpleLink";

const Navbar = () => {

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <nav className="bg-gray-200 mb-12 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <img src="/bitcoin.svg" className="mr-3 h-8" alt="Bitcoin Logo"/>
          <span
            className="self-center whitespace-nowrap hidden text-lg font-semibold dark:text-white xs:block md:text-2xl">
            Crypto Balance Tracker
          </span>
        </Link>
        <NavbarBurgerButton/>
        <div className="hidden w-full lg:block lg:w-auto text-center mt-1" id="navbar">
          <ul className="flex flex-col rounded-lg border border-gray-400 bg-gray-200 p-4 font-medium lg:space-x-8 lg:mt-0 lg:flex-row lg:border-0 lg:p-0 dark:border-gray-700 dark:bg-gray-900">
            <NavbarSimpleLink toLink={"/"} linkTitle={"Home"}/>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-center w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 lg:dark:hover:bg-transparent sm:flex sm:justify-center">
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
            <NavbarSimpleLink toLink={"/platforms"} linkTitle={"Platforms"}/>
            <NavbarSimpleLink toLink={"/goals"} linkTitle={"Goals"}/>
            <NavbarSimpleLink toLink={"/price-targets"} linkTitle={"Targets"}/>
            <DarkModeToggle/>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar