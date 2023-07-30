import {Fragment} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import AddGoalForm from "../../components/goal/AddGoalForm";
import withScrollToTop from "../../hoc/withScrollToTop";

const AddGoalPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <AddGoalForm/>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(AddGoalPage)