import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddNewButton from "../../components/buttons/AddNewButton";
import CryptosTable from "../../components/crypto/CryptosTable";
import withScrollToTop from "../../hoc/withScrollToTop";

const CryptosPage = () => {

  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <AddNewButton text="+ Add New Crypto" href="/crypto"/>
        <CryptosTable/>
      </div>
      <Footer/>
    </>
  );
}

export default withScrollToTop(CryptosPage)