import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import {Fragment} from "react";
import AddPlatformForm from "../../components/platform/AddPlatformForm";

const AddPlatformPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <AddPlatformForm/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(AddPlatformPage)