import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment} from "react";
import EditPlatformForm from "../../components/platform/EditPlatformForm";

const EditPlatformPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <EditPlatformForm/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(EditPlatformPage)