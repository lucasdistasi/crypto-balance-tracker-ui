import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment} from "react";
import CryptoForm from "../../components/crypto/CryptoForm";
import {FORM_ACTION} from "../../model/FormAction";

const EditCryptoPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <CryptoForm action={FORM_ACTION.UPDATE}/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(EditCryptoPage)