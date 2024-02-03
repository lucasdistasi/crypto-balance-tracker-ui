import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";
import Chart from "react-google-charts";

const PlatformInsightsChart = ({platformInsightsResponse}: {
  platformInsightsResponse: PlatformInsightsResponse
}) => {

  function getData() {
    const cryptos = platformInsightsResponse.cryptos.map(crypto => [crypto.cryptoName, Number(crypto.balances.totalUSDBalance)]);

    return [["Cryptos", "USD Balance"], ...cryptos];
  }

  return (
    <Chart
      chartType="PieChart"
      data={getData()}
      options={{
        titleTextStyle: {fontSize: 32, textAlign: "center"}
      }}
      width={"100%"}
      height={"650px"}
    />
  );
}

export default PlatformInsightsChart