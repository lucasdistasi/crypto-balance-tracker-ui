import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import {Fragment} from "react";
import GoalForm from "../../components/goal/GoalForm";
import {FORM_ACTION} from "../../model/FormAction";

const EditGoalPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <GoalForm action={FORM_ACTION.UPDATE}/>
      <Footer/>
    </Fragment>
  );
}

export default EditGoalPage