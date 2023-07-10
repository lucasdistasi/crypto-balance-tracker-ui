import {Fragment} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import GoalForm from "../../components/goal/GoalForm";
import {FORM_ACTION} from "../../model/FormAction";

const AddGoalPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <GoalForm action={FORM_ACTION.ADD}/>
      <Footer/>
    </Fragment>
  )
}

export default AddGoalPage