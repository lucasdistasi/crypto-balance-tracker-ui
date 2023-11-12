import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import {Fragment} from "react";
import CryptosInsightsCards from "../../components/insights/CryptosInsightsCards";
import withScrollToTop from "../../hoc/withScrollToTop";

const CryptosInsightsPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <div className="min-h-screen">
        <CryptosInsightsCards/>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(CryptosInsightsPage)