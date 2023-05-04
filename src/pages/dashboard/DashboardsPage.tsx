import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import DashboardCryptosTable from "../../components/dashboard/table/DashboardCryptosTable";
import PlatformBalancesChart from "../../components/dashboard/chart/PlatformBalancesChart";
import CryptosBalancesPlatformsTable from "../../components/dashboard/table/CryptosBalancesPlatformsTable";
import CryptosBalancesChart from "../../components/dashboard/chart/CryptosBalancesChart";
import PlatformsCryptosDistributionChart from "../../components/dashboard/chart/PlatformsCryptosDistributionChart";
import CryptoPlatformsDistributionChart from "../../components/dashboard/chart/CryptoPlatformsDistributionChart";
import {Fragment} from "react";

const DashboardsPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center mb-10">
        <DashboardCryptosTable/>
        <CryptosBalancesPlatformsTable/>
        <CryptosBalancesChart/>
        <PlatformBalancesChart/>
        <PlatformsCryptosDistributionChart/>
        <CryptoPlatformsDistributionChart/>
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(DashboardsPage)