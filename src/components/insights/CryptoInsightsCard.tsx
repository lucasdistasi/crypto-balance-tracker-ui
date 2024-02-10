import {Link} from "react-router-dom";
import {UserCryptosInsights} from "../../model/response/insight/UserCryptosInsights";
import CryptoInsightsCardRow from "./CryptoInsightsCardRow";

const CryptoInsightsCard = ({crypto}: { crypto: UserCryptosInsights }) => {

  const getProgressColor = (percentage: number) => {
    if (percentage >= 0 && percentage < 20) {
      return "bg-pink-600";
    }

    if (percentage >= 20 && percentage < 50) {
      return "bg-yellow-600"
    }

    if (percentage >= 50 && percentage < 80) {
      return "bg-indigo-600"
    }

    if (percentage >= 80 && percentage < 100) {
      return "bg-blue-600"
    }

    return "bg-green-600"
  }

  return (
    <div className="flex flex-col items-center pb-10">
      <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
           src={crypto.cryptoInfo.image}
           alt={`${crypto.cryptoInfo.cryptoName}`}/>
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {crypto.cryptoInfo.cryptoName}
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {crypto.cryptoInfo.symbol.toUpperCase()}
      </span>

      <div className="flow-root mt-5">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <CryptoInsightsCardRow title="Quantity"
                                 value={crypto.quantity}/>
          <CryptoInsightsCardRow title="Percentage"
                                 value={`${crypto.percentage}%`}/>
          <CryptoInsightsCardRow title="Balance"
                                 value={`U$D ${crypto.balances.totalUSDBalance}`}/>
          <CryptoInsightsCardRow title="Market Cap Rank"
                                 value={crypto.marketCapRank}/>
          <CryptoInsightsCardRow title="Current Price"
                                 value={`$${crypto.marketData.currentPrice.usd}`}/>
          <CryptoInsightsCardRow title="Market Cap"
                                 value={crypto.marketData.marketCap}/>
          <CryptoInsightsCardRow title="24 hours change"
                                 value={`${crypto.marketData.priceChange.changePercentageIn24h}%`}/>
          <CryptoInsightsCardRow title="7 days change"
                                 value={`${crypto.marketData.priceChange.changePercentageIn7d}%`}/>
          <CryptoInsightsCardRow title="30 days change"
                                 value={`${crypto.marketData.priceChange.changePercentageIn30d}%`}/>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Circulating Supply
                </p>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {
                      crypto.marketData.circulatingSupply.totalCirculatingSupply
                    }
                  </span>
                </div>
                {
                  crypto.marketData.maxSupply !== "0" &&
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className={`${getProgressColor(crypto.marketData.circulatingSupply.percentage)} h-2.5 rounded-full`}
                         style={{width: `${crypto.marketData.circulatingSupply.percentage}%`}}></div>
                  </div>
                }
              </div>
            </div>
          </li>
          <CryptoInsightsCardRow title="Max Supply"
                                 value={crypto.marketData.maxSupply === "0" ? "∞" : crypto.marketData.maxSupply}/>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Platforms
                </p>
                <ul className="text-gray-500 list-disc list-inside">
                  {
                    crypto.platforms.map(cryptoPlatform => (
                      <li key={cryptoPlatform}
                          className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {
                          cryptoPlatform
                        }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Link to={`/insights/cryptos/${crypto.cryptoInfo.cryptoId}`}>
        <button type="button"
                className="w-full whitespace-nowrap text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800">
          View Insights
        </button>
      </Link>
    </div>
  )
}

export default CryptoInsightsCard