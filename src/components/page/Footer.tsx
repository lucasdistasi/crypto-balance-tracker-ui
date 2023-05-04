import {Link} from "react-router-dom";

const Footer = () => {

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="flex flex-row justify-center text-center mb-6 md:mb-0">
            <div className="xs:flex-row flex flex-col items-center">
              <img src="/bitcoin.svg" className="mr-3 h-8" alt="Bitcoin Logo"/>
              <span className="xs:mt-0 mt-3 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Crypto Balance Tracker
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Cryptos
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="/cryptos" className="hover:underline">
                    Cryptos
                  </Link>
                </li>
                <li>
                  <Link to="/crypto" className="hover:underline">
                    Add Crypto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Platforms
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="/platforms" className="hover:underline ">
                    Platforms
                  </Link>
                </li>
                <li>
                  <Link to="/platform" className="hover:underline">
                    Add Platform
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Dashboards
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Dashboards
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
        <div className="flex-col text-center flex items-center justify-between md:flex-row">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a
            href="https://flowbite.com/" target="_blank" className="hover:underline">
              Flowbite™
            </a>. All Rights Reserved.
          </span>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Made by <a href="https://www.linkedin.com/in/lucas-david-distasi/" target="_blank" className="hover:underline">Lucas Di Stasi</a> using <a href="https://www.coingecko.com/en/api" target="_blank" className="hover:underline">
              CoinGecko API
            </a>.
            <img src="/coingecko.svg" className="inline-block h-8 ml-1" alt="Coingecko Logo"/>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer