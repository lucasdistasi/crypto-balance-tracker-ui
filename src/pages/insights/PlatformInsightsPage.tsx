import withScrollToTop from "../../hoc/withScrollToTop";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment, useEffect, useState} from "react";
import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";
import {retrievePlatformInsights} from "../../services/insightsService";
import {useParams} from "react-router-dom";
import TotalBalanceCards from "../../components/insights/TotalBalanceCards";
import PlatformInsightsTable from "../../components/insights/PlatformInsightsTable";
import {deleteCryptoService} from "../../services/cryptoService";
import InsightsPageSkeleton from "../../components/skeletons/InsightsPageSkeleton";
import ErrorComponent from "../../components/page/ErrorComponent";
import BalancesPieChart from "../../components/insights/BalancesPieChart";
import AddNewButton from "../../components/buttons/AddNewButton";
import {getPlatformService} from "../../services/platformService";
import {PlatformResponse} from "../../model/response/platform/PlatformResponse";

const PlatformInsightsPage = () => {

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
  const [platformResponse, setPlatformResponse] = useState<PlatformResponse>({
    id: "",
    name: ""
  });
  const [isLoadingPlatformInsightsResponse, setIsLoadingPlatformInsightsResponse] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const response = await retrievePlatformInsights(platformId);
          setPlatformInsightsResponse(response)

          if (!response || response.status == 204) {
            const platform = await getPlatformService(platformId);
            setPlatformResponse(platform);
          }
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
            const response = await retrievePlatformInsights(platformId);
            setPlatformInsightsResponse(response);

            // FIXME - add crypto button does not have the platform name
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
          !error && !isLoadingPlatformInsightsResponse && !platformInsightsResponse &&
          <Fragment>
            <TotalBalanceCards totalUsdValue={Number(0)}
                               totalEurValue={Number(0)}
                               totalBtcValue={Number(0)}/>

            <AddNewButton
              href={`/crypto?platform=${platformResponse.name}&redirectTo=/insights/platform/${platformId}`}
              text="Add Crypto"/>
          </Fragment>
        }

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

            <AddNewButton
              href={`/crypto?platform=${platformInsightsResponse.platformName}&redirectTo=/insights/platform/${platformId}`}
              text="Add Crypto"/>

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