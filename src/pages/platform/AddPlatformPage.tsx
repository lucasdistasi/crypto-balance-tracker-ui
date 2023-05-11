import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import {FORM_ACTION} from "../../model/FormAction";
import PlatformForm from "../../components/platform/PlatformForm";
import {Fragment} from "react";

const AddPlatformPage = () => {

  return (
    <Fragment>
      <Navbar/>
      <PlatformForm action={FORM_ACTION.ADD}/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(AddPlatformPage)