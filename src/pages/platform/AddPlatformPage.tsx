import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddPlatformForm from "../../components/platform/AddPlatformForm";
import withScrollToTop from "../../hoc/withScrollToTop";

const AddPlatformPage = () => {

  return (
    <>
      <Navbar/>
      <AddPlatformForm/>
      <Footer/>
    </>
  );
}

export default withScrollToTop(AddPlatformPage)