import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import {Fragment} from "react";
import AddCryptoForm from "../../components/crypto/AddCryptoForm";

const AddCryptoPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <AddCryptoForm/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(AddCryptoPage)