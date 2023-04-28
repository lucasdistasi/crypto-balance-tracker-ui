import {useEffect, useState} from "react";
import {HTTP_METHOD} from "../../model/HttpMethod";
import {HEADERS} from "../../model/Headers";
import {HEADERS_VALUE} from "../../model/HeadersValue";

const CryptoDistributionChart = () => {

  // TODO - Use the new endpoint
  const [cryptosNames, setCryptosNames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cryptos/set", {
      method: HTTP_METHOD.GET,
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS_VALUE.APPLICATION_JSON,
      },
    }).then(response => {
      if (response.status == 200) {
        response.json()
          .then(apiResponse => {
            setCryptosNames(apiResponse);
          });
      }
    });


  }, []);

  return (
    <></>
  );
}

export default CryptoDistributionChart