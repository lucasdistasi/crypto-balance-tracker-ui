import Chart from "react-google-charts";
import {CryptoInsightResponse} from "../../model/response/insight/CryptoInsightResponse";

const options = {
  titleTextStyle: {fontSize: 32, textAlign: "center"},
};

const CryptoInsightsChart = ({cryptoInsightResponse}: {
  cryptoInsightResponse: CryptoInsightResponse
}) => {

  const getData = () => {
    const platforms = cryptoInsightResponse.platforms?.map(platform => [platform.platformName, Number(platform.balances.totalUSDBalance)]);

    return [["Platforms", "USD Balance"], ...platforms];
  }

  return (
    <Chart
      chartType="PieChart"
      data={getData()}
      options={options}
      width={"100%"}
      height={"650px"}
    />
  );
}

export default CryptoInsightsChart