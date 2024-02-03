import withScrollToTop from "../../hoc/withScrollToTop";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment, useEffect, useState} from "react";
import {PlatformInsightsResponse} from "../../model/response/insight/PlatformInsightsResponse";
import {retrievePlatformInsights} from "../../services/insightsService";
import {useNavigate, useParams} from "react-router-dom";
import TotalBalanceCards from "../../components/insights/TotalBalanceCards";
import PlatformInsightsTable from "../../components/insights/PlatformInsightsTable";
import PlatformInsightsChart from "../../components/insights/PlatformInsightsChart";
import {deleteCryptoService} from "../../services/cryptoService";
import InsightsPageSkeleton from "../../components/skeletons/InsightsPageSkeleton";

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
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        }
      }
    )()
  }, []);

  const deleteCrypto = async (cryptoId: string) => {
    try {
      await deleteCryptoService(cryptoId)
        .then(async (axiosResponse) => {
          if (axiosResponse.status === 200) {
            const response = await retrievePlatformInsights(platformId);
            setPlatformInsightsResponse(response);
          }
        });
    } catch (ex: any) {
      setError(true);
    }
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        {
          !error && !loading && platformInsightsResponse.cryptos?.length > 0 &&
          <Fragment>
            <h1 className="text-4xl text-center my-12">
              {`${platformInsightsResponse.platformName} DISTRIBUTION`}
            </h1>

            <TotalBalanceCards totalUsdValue={Number(platformInsightsResponse.balances.totalUSDBalance)}
                               totalEurValue={Number(platformInsightsResponse.balances.totalEURBalance)}
                               totalBtcValue={Number(platformInsightsResponse.balances.totalBTCBalance)}/>

            <PlatformInsightsChart platformInsightsResponse={platformInsightsResponse}/>

            <PlatformInsightsTable platformInsightsResponse={platformInsightsResponse}
                                   deleteCryptoFunction={(cryptoId: string) => deleteCrypto(cryptoId)}/>
          </Fragment>
        }

        {
          loading && !error &&
          <InsightsPageSkeleton/>
        }

        {
          error && !loading &&
          <p>Some error has occurred</p>
        }
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(PlatformInsightsPage)