import Navbar from "./components/Navbar";
import AddNewButton from "./components/buttons/AddNewButton";
import Table from "./components/Table";
import Footer from "./components/Footer";
import React from "react";

const App = () => {
  return (
    <>
      <Navbar/>
      <AddNewButton text="+ Add New Crypto"/>
      <Table/>
      <Footer/>
    </>
  );
}

export default App;
