import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment} from "react";
import {FORM_ACTION} from "../../model/FormAction";
import PlatformForm from "../../components/platform/PlatformForm";

const EditPlatformPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <PlatformForm action={FORM_ACTION.UPDATE}/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(EditPlatformPage)