import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import {FORM_ACTION} from "../../model/FormAction";
import PlatformForm from "../../components/platform/PlatformForm";

const AddPlatformPage = () => {

  return (
    <>
      <Navbar/>
      <PlatformForm action={FORM_ACTION.ADD}/>
      <Footer/>
    </>
  );
}

export default withScrollToTop(AddPlatformPage)