import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import {Fragment} from "react";
import UpdateGoalForm from "../../components/goal/UpdateGoalForm";
import withScrollToTop from "../../hoc/withScrollToTop";

const EditGoalPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <UpdateGoalForm/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(EditGoalPage)