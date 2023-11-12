import withScrollToTop from "../../hoc/withScrollToTop";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import React, {Fragment} from "react";
import PlatformInsightsChart from "../../components/insights/PlatformInsightsChart";

const PlatformInsightsPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <div className="min-h-screen">
        <PlatformInsightsChart/>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(PlatformInsightsPage)