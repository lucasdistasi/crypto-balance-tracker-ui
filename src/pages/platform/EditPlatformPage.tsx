import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import EditPlatformForm from "../../components/platform/EditPlatformForm";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useEffect, useState} from "react";
import Platform from "../../model/Platform";
import {getPlatformsURL} from "../../constants/Constants";
import NotFound from "../error/NotFound";

const EditPlatformPage = () => {

  const [platform, setPlatform] = useState<Platform>({
    name: ""
  });

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const platformId: string = window.location.pathname.split('/').pop() ?? "";
    const platformInfoURL = getPlatformsURL(platformId);

    fetch(platformInfoURL)
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 404) {
          setNotFound(true);
        }

        setPlatform(data);
      })
  }, []);

  if (notFound) {
    return <NotFound/>
  }

  return (
    <Fragment>
      <Navbar/>
      <EditPlatformForm name={platform.name}/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(EditPlatformPage)