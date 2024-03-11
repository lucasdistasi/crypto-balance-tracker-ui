import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import PlatformsBalancesChart from "../../components/insights/PlatformsBalancesChart";
import CryptosBalancesChart from "../../components/insights/CryptosBalancesChart";
import {Fragment} from "react";
import TotalBalancesCards from "../../components/insights/TotalBalancesCards";
import DaysBalancesChart from "../../components/insights/DaysBalancesChart";

const HomePage = () => {

  return (
    <Fragment>
      <Navbar/>
      <div className="min-h-screen">
        <TotalBalancesCards/>
        <DaysBalancesChart/>
        <CryptosBalancesChart/>
        <PlatformsBalancesChart/>
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(HomePage)