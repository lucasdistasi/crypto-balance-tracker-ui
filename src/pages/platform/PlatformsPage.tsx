import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddNewButton from "../../components/buttons/AddNewButton";
import PlatformsTable from "../../components/platform/PlatformsTable";
import withScrollToTop from "../../hoc/withScrollToTop";

const PlatformsPage = () => {

  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <AddNewButton text="+ Add New Platform" href="/platform"/>
        <PlatformsTable/>
      </div>
      <Footer/>
    </>
  );
}

export default withScrollToTop(PlatformsPage)