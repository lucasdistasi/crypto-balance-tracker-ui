import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import {Fragment} from "react";
import EditGoalForm from "../../components/goal/EditGoalForm";

const EditGoalPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <EditGoalForm/>
      <Footer/>
    </Fragment>
  );
}

export default EditGoalPage