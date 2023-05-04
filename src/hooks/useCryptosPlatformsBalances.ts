import {useEffect, useState} from "react";
import {CryptosBalancesPlatformsResponse} from "../response/CryptosBalancesPlatformsResponse";
import {DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT} from "../constants/Constants";
import axios from "axios";

export const useCryptosPlatformsBalances = () => {

  const [response, setResponse] = useState<CryptosBalancesPlatformsResponse>({
    coinInfoResponse: []
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await axios.get(DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT);
          setResponse(response.data);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

  return {
    response,
    error,
    loading
  }
}