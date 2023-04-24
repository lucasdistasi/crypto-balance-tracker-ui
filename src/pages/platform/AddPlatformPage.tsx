import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddPlatform from "../../components/platform/AddPlatform";
import withScrollToTop from "../../hoc/withScrollToTop";

const AddPlatformPage = () => {

  return (
    <>
      <Navbar/>
      <AddPlatform/>
      <Footer/>
    </>
  );
}

export default withScrollToTop(AddPlatformPage)