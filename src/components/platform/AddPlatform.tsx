import PlatformForm from "./PlatformForm";
import {FORM_ACTION} from "../../model/FormAction";

const AddPlatform = () => {

  return (
    <PlatformForm action={FORM_ACTION.ADD}/>
  );
}

export default AddPlatform