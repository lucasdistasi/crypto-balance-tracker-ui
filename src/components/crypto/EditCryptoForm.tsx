import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Crypto} from "../../model/request/crypto/Crypto";
import {getCryptosURL, MONGO_ID_REGEX} from "../../constants/Constants";
import axios from "axios";
import ErrorResponse from "../../model/response/ErrorResponse";
import {Form, Formik} from "formik";
import EditableTextInput from "../form/EditableTextInput";
import CryptoPlatformDropdown from "../form/CryptoPlatformDropdown";
import SubmitButton from "../form/SubmitButton";
import ErrorAlert from "../page/ErrorAlert";
import ErrorListAlert from "../page/ErrorListAlert";
import DisabledTextInput from "../form/DisabledTextInput";
import {updateCryptoValidationSchema} from "../../constants/ValidationSchemas";

const EditCryptoForm = () => {

  const navigate = useNavigate();
  const params = useParams();
  const cryptoId: string = params.id!!;

  const [crypto, setCrypto] = useState<Crypto>();
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<ErrorResponse[]>([]);
  const [fetchInfoError, setFetchInfoError] = useState(false);
  const [noChangesError, setNoChangesError] = useState(false);

  useEffect(() => {
    (async () => {
        if (MONGO_ID_REGEX.test(cryptoId)) {
          const cryptoInfoURL = getCryptosURL(cryptoId);

          try {
            const {data} = await axios.get(cryptoInfoURL);

            setCrypto(data);
          } catch (error: any) {
            setFetchInfoError(true);
          } finally {
            setIsLoading(false);
          }
        } else {
          navigate("/404");
        }
      }
    )();
  }, []);

  const updateCrypto = async ({...values}) => {
    const {quantity, platform} = values;

    if (crypto?.quantity.toString() === quantity.toString() && crypto?.platform === platform) {
      setNoChangesError(true);
      return;
    }

    try {
      await axios.put(getCryptosURL(cryptoId), {
        quantity,
        platform
      });

      navigate("/cryptos");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiResponseError(error.response.data.errors);
      }

      if (status >= 500) {
        navigate("/error");
      }
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        {
          `Update ${crypto?.coinName}`
        }
      </h1>

      {
        apiResponseError && apiResponseError.length >= 1 &&
        <ErrorListAlert
          title="Error updating crypto"
          errors={apiResponseError}/>
      }

      {
        fetchInfoError &&
        <ErrorAlert message="Error retrieving crypto info"/>
      }

      {
        noChangesError &&
        <ErrorAlert message="No changes were made"/>
      }

      {
        !fetchInfoError && !isLoading &&
        <Formik
          initialValues={{
            cryptoName: crypto?.coinName ?? '',
            quantity: crypto?.quantity ?? 0,
            platform: crypto?.platform ?? ''
          }}
          validationSchema={updateCryptoValidationSchema}
          onSubmit={(values, {setSubmitting}) => {
            updateCrypto(values);
          }}>

          <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
            <DisabledTextInput label="Crypto Name"
                               type="text"
                               name="cryptoName"/>
            <EditableTextInput label="Quantity"
                               type="number"
                               name="quantity"/>
            <CryptoPlatformDropdown label="Platform"
                                    name="platform"/>
            <SubmitButton text="Update crypto"/>
          </Form>
        </Formik>
      }
    </div>
  );
}

export default EditCryptoForm