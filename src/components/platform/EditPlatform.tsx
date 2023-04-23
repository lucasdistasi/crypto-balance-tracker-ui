import React, {useEffect, useState} from "react";
import {getPlatformsURL} from "../../constants/Constants";
import NotFound from "../../pages/error/NotFound";
import PlatformForm from "./PlatformForm";
import {FORM_ACTION} from "../../model/FormAction";

const EditPlatform = () => {

  const [platformName, setPlatformName] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const platformId: string = window.location.pathname.split('/').pop() ?? "";
    const platformInfoURL = getPlatformsURL(platformId.toUpperCase());

    fetch(platformInfoURL)
      .then(response => response.json())
      .then(response => {
        if (response.statusCode === 404) {
          setNotFound(true);
        }

        setPlatformName(response.name);
      })
  }, []);

  if (notFound) {
    return <NotFound/>
  }

  return (
    <PlatformForm action={FORM_ACTION.UPDATE}
                  currentValue={platformName}/>
  );
}

export default EditPlatform