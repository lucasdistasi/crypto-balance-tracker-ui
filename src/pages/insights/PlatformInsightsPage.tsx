import withScrollToTop from "../../hoc/withScrollToTop";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment, useEffect, useState} from "react";
import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";
import {retrievePlatformInsights} from "../../services/insightsService";
import {useParams} from "react-router-dom";
import PlatformInsightsTable from "../../components/insights/PlatformInsightsTable";
import {deleteCryptoService} from "../../services/cryptoService";
import InsightsPageSkeleton from "../../components/skeletons/InsightsPageSkeleton";
import ErrorComponent from "../../components/page/ErrorComponent";
import BalancesPieChart from "../../components/insights/BalancesPieChart";
import AddNewButton from "../../components/buttons/AddNewButton";
import {getPlatformService} from "../../services/platformService";
import {PlatformResponse} from "../../model/response/platform/PlatformResponse";
import {isSuccessfulStatus} from "../../utils/utils";
import InsightCard from "../../components/insights/InsightCard";

const PlatformInsightsPage = () => {

  const params = useParams();
  const platformId: string = params.platformId!;
  const [platformInsightsResponse, setPlatformInsightsResponse] = useState<PlatformInsightsResponse>({
    balances: {
      fiat: {
        usd: "0",
        eur: "0"
      },
      btc: "0"
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
          const response: PlatformInsightsResponse = await retrievePlatformInsights(platformId);
          setPlatformInsightsResponse(response);

          const platform = await getPlatformService(platformId);
          setPlatformResponse(platform);
        } catch (error: unknown) {
          setError(true);
        } finally {
          setIsLoadingPlatformInsightsResponse(false);
        }
      }
    )();
  }, []);

  const deleteCrypto = async (cryptoId: string) => {
    try {
      setIsLoadingPlatformInsightsResponse(true);
      await deleteCryptoService(cryptoId)
        .then(async (axiosResponse) => {
          if (isSuccessfulStatus(axiosResponse.status)) {
            const response: PlatformInsightsResponse = await retrievePlatformInsights(platformId);
            setPlatformInsightsResponse(response);

            // FIXME - add crypto button does not have the platform name
          }
        });
    } catch (error: unknown) {
      setError(true);
    } finally {
      setIsLoadingPlatformInsightsResponse(false);
    }
  };

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        {
          !error && !isLoadingPlatformInsightsResponse && !platformInsightsResponse &&
          <Fragment>
            <InsightCard title={"Total value in USD"}
                         value={0}
                         decimals={2}
                         symbol="$"/>
            <InsightCard title={"Total value in BTC"}
                         value={0}
                         decimals={8}
                         symbol="₿"/>

            <AddNewButton
              href={`/crypto?platform=${platformResponse.name}&redirectTo=/insights/platform/${platformId}`}
              text="Add Crypto"/>
          </Fragment>
        }

        {
          !error && !isLoadingPlatformInsightsResponse && platformInsightsResponse?.cryptos?.length > 0 &&
          <Fragment>
            <div className="container mt-16 flex flex-col w-full mx-auto justify-between xl:flex-row">
              <InsightCard title={"Total value in USD"}
                           value={Number(platformInsightsResponse.balances.fiat.usd)}
                           decimals={2}
                           symbol="$"/>
              <InsightCard title={"Total value in BTC"}
                           value={Number(platformInsightsResponse.balances.btc)}
                           decimals={8}
                           symbol="₿"/>
            </div>

            <BalancesPieChart chartId="platform-pie-chart"
                              chartTitle={`${platformInsightsResponse.platformName} DISTRIBUTION`}
                              series={platformInsightsResponse.cryptos.map(crypto => Number(crypto.balances.fiat.usd))}
                              labels={platformInsightsResponse.cryptos.map(crypto => crypto.cryptoInfo.cryptoName!)}/>

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
  );
};

export default withScrollToTop(PlatformInsightsPage);