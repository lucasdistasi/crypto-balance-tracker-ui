import {useEffect, useState} from "react";
import {CryptosBalancesPlatformsResponse} from "../model/response/crypto/CryptosBalancesPlatformsResponse";
import {getDashboardsCryptosPlatformsBalancesService} from "../services/platformServvice";

export const useCryptosPlatformsBalances = () => {

  const [response, setResponse] = useState<CryptosBalancesPlatformsResponse>({
    cryptoInfoResponse: []
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
          const response = await getDashboardsCryptosPlatformsBalancesService();
          setResponse(response);
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