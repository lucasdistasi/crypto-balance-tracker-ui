import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddNewButton from "../../components/buttons/AddNewButton";
import CryptosTable from "../../components/crypto/CryptosTable";

const CryptosPage = () => {

  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center">
        <AddNewButton text="+ Add New Crypto" href="/crypto"/>
        <CryptosTable/>
      </div>
      <Footer/>
    </>
  );
}

export default CryptosPage