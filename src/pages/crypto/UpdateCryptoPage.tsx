import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment} from "react";
import UpdateCryptoForm from "../../components/crypto/UpdateCryptoForm";

const UpdateCryptoPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <UpdateCryptoForm/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(UpdateCryptoPage)