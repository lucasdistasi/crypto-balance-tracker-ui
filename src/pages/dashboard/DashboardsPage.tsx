import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import DashboardCryptosTable from "../../components/dashboard/DashboardCryptosTable";

const DashboardsPage = () => {

  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center">
        <DashboardCryptosTable/> // TODO - Fix this issue
      </div>
      <Footer/>
    </>
  );
}

export default withScrollToTop(DashboardsPage)