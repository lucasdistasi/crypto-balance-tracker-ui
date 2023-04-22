import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import EditCryptoForm from "../../components/crypto/EditCryptoForm";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useEffect, useState} from "react";
import Crypto from "../../model/Crypto";
import {getCryptosURL} from "../../constants/Constants";
import NotFound from "../error/NotFound";

const EditCryptoPage = () => {

  const [crypto, setCrypto] = useState<Crypto>({
    coinId: "",
    coinName: "",
    platform: "",
    quantity: 0n
  });

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const cryptoId: string = window.location.pathname.split('/').pop() ?? "";
    const cryptoInfoURL = getCryptosURL(cryptoId);

    fetch(cryptoInfoURL)
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 404) {
          setNotFound(true);
        }

        setCrypto(data);
      })
  }, [])

  if (notFound) {
    return <NotFound/>
  }

  return (
    <Fragment>
      <Navbar/>
      <EditCryptoForm coinId={crypto.coinId}
                      coinName={crypto.coinName}
                      platform={crypto.platform}
                      quantity={crypto.quantity}/>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(EditCryptoPage)