import {Fragment} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddNewButton from "../../components/buttons/AddNewButton";
import GoalsTable from "../../components/goal/GoalsTable";
import withScrollToTop from "../../hoc/withScrollToTop";

const GoalsPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <AddNewButton text="+ Add New Goal" href="/goal"/>
        <GoalsTable/>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(GoalsPage)