import {NavLink} from "react-router-dom";

const NavbarSimpleLink = ({toLink, linkTitle}: {
  toLink: string,
  linkTitle: string
}) => {

  return (
    <li>
      <NavLink to={toLink}
               className="block rounded-sm py-2 pr-4 pl-3 text-gray-900 hover:bg-gray-100 dark:text-white lg:border-0 lg:p-0 dark:hover:bg-gray-700 dark:hover:text-white lg:hover:bg-transparent lg:hover:text-blue-700 lg:dark:hover:bg-transparent lg:dark:hover:text-blue-500">
        {linkTitle}
      </NavLink>
    </li>
  )
}

export default NavbarSimpleLink;