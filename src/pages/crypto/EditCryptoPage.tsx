import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import EditCryptoForm from "../../components/crypto/EditCryptoForm";
import withScrollToTop from "../../hoc/withScrollToTop";

const EditCryptoPage = () => {

  return (
    <>
      <Navbar/>
      <EditCryptoForm/>
      <Footer/>
    </>
  );
}

export default withScrollToTop(EditCryptoPage)