import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import EditPlatformForm from "../../components/platform/EditPlatformForm";
import withScrollToTop from "../../hoc/withScrollToTop";

const EditPlatformPage = () => {

  return (
    <>
      <Navbar/>
      <EditPlatformForm/>
      <Footer/>
    </>
  );
}

export default withScrollToTop(EditPlatformPage)