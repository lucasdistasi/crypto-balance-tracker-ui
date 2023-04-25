import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import {FORM_ACTION} from "../../model/FormAction";
import CryptoForm from "../../components/crypto/CryptoForm";
import {Fragment} from "react";

const AddCryptoPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <CryptoForm action={FORM_ACTION.ADD}/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(AddCryptoPage)