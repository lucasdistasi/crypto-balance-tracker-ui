import PlatformForm from "./PlatformForm";
import {FORM_ACTION} from "../../model/FormAction";

const EditPlatform = () => {

  return (
    <PlatformForm action={FORM_ACTION.UPDATE}/>
  );
}

export default EditPlatform