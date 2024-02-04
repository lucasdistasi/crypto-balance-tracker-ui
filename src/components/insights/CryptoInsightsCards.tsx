import CryptoInsightsCard from "./CryptoInsightsCard";
import {UserCryptosInsights} from "../../model/response/insight/UserCryptosInsights";

const CryptoInsightsCards = ({cryptos}: {
  cryptos: Array<UserCryptosInsights>
}) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {
        cryptos.map((crypto) => (
          <div id={crypto.cryptoInfo.id ?? crypto.cryptoInfo.cryptoId}
               key={crypto.cryptoInfo.id ?? crypto.cryptoInfo.cryptoId}
               className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-5">
            <CryptoInsightsCard crypto={crypto}/>
          </div>
        ))
      }
    </div>
  );
}

export default CryptoInsightsCards