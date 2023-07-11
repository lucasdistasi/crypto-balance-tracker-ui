import React, {Fragment} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import TransferCryptoForm from "../../components/crypto/TransferCryptoForm";
import withScrollToTop from "../../hoc/withScrollToTop";

const TransferCryptoPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <TransferCryptoForm/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(TransferCryptoPage)