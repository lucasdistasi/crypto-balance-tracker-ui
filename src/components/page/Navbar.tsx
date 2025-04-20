import {Link} from "react-router-dom";
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
    <nav className="bg-gray-200 mb-12 border-b border-b-gray-700 dark:bg-dark-3">
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
          <ul className="flex flex-col rounded-lg border border-gray-400 bg-gray-200 p-4 font-medium lg:space-x-8 lg:mt-0 lg:flex-row lg:border-0 lg:p-0 dark:border-gray-700 dark:bg-dark-3">
            <NavbarSimpleLink toLink={"/"} linkTitle={"Home"}/>
            <NavbarSimpleLink toLink={"/cryptos"} linkTitle={"Cryptos"}/>
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