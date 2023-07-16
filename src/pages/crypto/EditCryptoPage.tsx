import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment} from "react";
import EditCryptoForm from "../../components/crypto/EditCryptoForm";

const EditCryptoPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <EditCryptoForm/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(EditCryptoPage)