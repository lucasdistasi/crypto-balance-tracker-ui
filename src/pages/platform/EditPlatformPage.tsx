import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import EditPlatform from "../../components/platform/EditPlatform";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment} from "react";

const EditPlatformPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <EditPlatform />
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(EditPlatformPage)