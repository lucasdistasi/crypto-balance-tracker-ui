import withScrollToTop from "../../hoc/withScrollToTop";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment, useEffect, useState} from "react";
import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";
import {retrievePlatformInsights} from "../../services/insightsService";
import {useNavigate, useParams} from "react-router-dom";
import TotalBalanceCards from "../../components/insights/TotalBalanceCards";
import PlatformInsightsTable from "../../components/insights/PlatformInsightsTable";
import {deleteCryptoService} from "../../services/cryptoService";
import InsightsPageSkeleton from "../../components/skeletons/InsightsPageSkeleton";
import ErrorComponent from "../../components/page/ErrorComponent";
import BalancesPieChart from "../../components/insights/BalancesPieChart";

const PlatformInsightsPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const platformId: string = params.platformId!!;
  const [platformInsightsResponse, setPlatformInsightsResponse] = useState<PlatformInsightsResponse>({
    balances: {
      totalUSDBalance: "0",
      totalEURBalance: "0",
      totalBTCBalance: "0"
    },
    cryptos: [],
    platformName: ""
  });
  const [isLoadingPlatformInsightsResponse, setIsLoadingPlatformInsightsResponse] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const response = await retrievePlatformInsights(platformId);

          if (!response || response.status === 204) {
            navigate("/");
          }

          setPlatformInsightsResponse(response);
        } catch (err) {
          setError(true);
        } finally {
          setIsLoadingPlatformInsightsResponse(false);
        }
      }
    )()
  }, []);

  const deleteCrypto = async (cryptoId: string) => {
    try {
      setIsLoadingPlatformInsightsResponse(true);
      await deleteCryptoService(cryptoId)
        .then(async (axiosResponse) => {
          if (axiosResponse.status === 200) {
            const cryptosQuantity = platformInsightsResponse.cryptos.length;
            const response = await retrievePlatformInsights(platformId);
            setPlatformInsightsResponse(response);

            if (cryptosQuantity == 1) {
              navigate("/");
            }
          }
        });
    } catch (err) {
      setError(true);
    } finally {
      setIsLoadingPlatformInsightsResponse(false);
    }
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        {
          !error && !isLoadingPlatformInsightsResponse && platformInsightsResponse?.cryptos?.length > 0 &&
          <Fragment>
            <TotalBalanceCards totalUsdValue={Number(platformInsightsResponse.balances.totalUSDBalance)}
                               totalEurValue={Number(platformInsightsResponse.balances.totalEURBalance)}
                               totalBtcValue={Number(platformInsightsResponse.balances.totalBTCBalance)}/>

            <BalancesPieChart chartId="platform-pie-chart"
                              chartTitle={`${platformInsightsResponse.platformName} DISTRIBUTION`}
                              series={platformInsightsResponse.cryptos.map(crypto => Number(crypto.balances.totalUSDBalance))}
                              labels={platformInsightsResponse.cryptos.map(crypto => crypto.cryptoName)}/>

            <PlatformInsightsTable platformInsightsResponse={platformInsightsResponse}
                                   deleteCryptoFunction={(cryptoId: string) => deleteCrypto(cryptoId)}/>
          </Fragment>
        }

        {
          isLoadingPlatformInsightsResponse && !error &&
          <InsightsPageSkeleton/>
        }

        {
          error && !isLoadingPlatformInsightsResponse &&
          <ErrorComponent text="Error retrieving platform insights"/>
        }
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(PlatformInsightsPage)