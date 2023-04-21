import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddCryptoForm from "../../components/crypto/AddCryptoForm";
import withScrollToTop from "../../hoc/withScrollToTop";

const AddCryptoPage = () => {

  return (
    <>
      <Navbar/>
      <AddCryptoForm/>
      <Footer/>
    </>
  );
}

export default withScrollToTop(AddCryptoPage)