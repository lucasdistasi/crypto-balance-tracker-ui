import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import {Fragment} from "react";
import withScrollToTop from "../../hoc/withScrollToTop";
import CryptosPlatformsInsightsCards from "../../components/insights/CryptosPlatformsInsightsCards";

const CryptosPlatformsInsightsPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <div className="min-h-screen">
        <CryptosPlatformsInsightsCards/>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(CryptosPlatformsInsightsPage)