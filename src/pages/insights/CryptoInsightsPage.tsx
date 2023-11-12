import withScrollToTop from "../../hoc/withScrollToTop";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import {Fragment} from "react";
import CryptoInsightsChart from "../../components/insights/CryptoInsightsChart";

const CryptoInsightsPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <div className="min-h-screen">
        <CryptoInsightsChart/>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(CryptoInsightsPage)