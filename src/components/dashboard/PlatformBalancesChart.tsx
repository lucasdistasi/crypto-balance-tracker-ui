import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import {DASHBOARDS_PLATFORMS_BALANCES_ENDPOINT} from "../../constants/Constants";
import {HTTP_METHOD} from "../../model/HttpMethod";
import {HEADERS} from "../../model/Headers";
import {HEADERS_VALUE} from "../../model/HeadersValue";
import {PlatformsBalancesResponse} from "../../response/PlatformsBalancesResponse";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const PlatformBalancesChart = () => {

  const [platformsBalances, setPlatformsBalances] = useState<PlatformsBalancesResponse>({
    platforms: [{
      percentage: 0,
      platformName: "",
      balance: 0n,
    }]
  });

  useEffect(() => {
    fetch(DASHBOARDS_PLATFORMS_BALANCES_ENDPOINT, {
      method: HTTP_METHOD.GET,
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS_VALUE.APPLICATION_JSON
      }
    }).then(response => {
      if (response.ok) {
        const apiResponse = response.json();
        apiResponse.then(responseBody => {
          setPlatformsBalances(responseBody);
        })
      }
    });
  }, []);

  const data = [
    ["Cryptos", "Balances"],
    ...platformsBalances?.platforms?.map(platform => [platform.platformName, platform.balance || 0])
  ];

  return (
    <Fragment>
      <h1 className="text-4xl">
        All Platforms Distributions
      </h1>

      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"650px"}
      />
    </Fragment>
  );
}

export default PlatformBalancesChart