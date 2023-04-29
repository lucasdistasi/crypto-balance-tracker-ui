import {useEffect, useState} from "react";
import {CryptosBalancesPlatformsResponse} from "../response/CryptosBalancesPlatformsResponse";
import {DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT} from "../constants/Constants";
import {HTTP_METHOD} from "../model/HttpMethod";

export function useCryptosPlatformsBalances() {

  const [response, setResponse] = useState<CryptosBalancesPlatformsResponse>({
    coinInfoResponse: []
  });

  useEffect(() => {
    fetch(DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT, {
      method: HTTP_METHOD.GET
    }).then(response => {
      if (response.status === 200) {
        const apiResponse = response.json();
        apiResponse.then(responseBody => {
          setResponse(responseBody);
        });
      }
    });
  }, []);

  return {
    response
  }
}