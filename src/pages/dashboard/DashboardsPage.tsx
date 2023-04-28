import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import DashboardCryptosTable from "../../components/dashboard/DashboardCryptosTable";
import PlatformBalancesChart from "../../components/dashboard/PlatformBalancesChart";
import CryptosBalancesPlatformsTable from "../../components/dashboard/CryptosBalancesPlatformsTable";
import CryptosBalancesChart from "../../components/dashboard/CryptosBalancesChart";

const DashboardsPage = () => {

  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center mb-10">
        <DashboardCryptosTable/>
        <CryptosBalancesPlatformsTable/>
        <CryptosBalancesChart/>
        <PlatformBalancesChart/>
      </div>
      <Footer/>
    </>
  );
}

export default withScrollToTop(DashboardsPage)