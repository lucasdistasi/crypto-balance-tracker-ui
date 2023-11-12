import {Link, useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import CryptoPlatformDropdown from "../form/CryptoPlatformDropdown";
import EditableTextInput from "../form/EditableTextInput";
import React, {Fragment, useState} from "react";
import SubmitButton from "../form/SubmitButton";
import ErrorResponse from "../../model/response/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";
import {addCryptoValidationSchema} from "../../constants/ValidationSchemas";
import {addCryptoService} from "../../services/cryptoService";
import {usePlatforms} from "../../hooks/usePlatforms";

const AddCryptoForm = () => {

  const navigate = useNavigate();

  const {platforms} = usePlatforms()
  const [apiErrors, setApiErrors] = useState<ErrorResponse[]>([]);

  const addCrypto = async ({...values}) => {
    const {cryptoName, quantity, platform} = values;
    const platformId = platforms.find(platformResponse => platformResponse.name == platform)?.id ?? ''

    try {
      await addCryptoService({
        cryptoName,
        quantity,
        platformId
      });

      navigate("/cryptos");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiErrors(error.response.data);
      }

      if (status >= 500) {
        navigate("/error");
      }
    }
  }

  return (
    <Fragment>
      <h1 className="text-4xl text-gray-900 text-center my-10">
        Add Crypto
      </h1>
      {
        platforms.length > 0 ?
          <div className="flex flex-col items-center">
            {
              apiErrors && apiErrors.length >= 1 &&
              <ErrorListAlert
                title="Error adding crypto"
                errors={apiErrors}/>
            }

            <Formik
              initialValues={{
                cryptoName: '',
                quantity: 0,
                platform: ''
              }}
              validationSchema={addCryptoValidationSchema}
              onSubmit={(values, {setSubmitting}) => {
                addCrypto(values);
              }}>

              <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
                <EditableTextInput label="Crypto Name"
                                   type="text"
                                   name="cryptoName"
                                   placeholder="Bitcoin"
                                   maxLength={64}/>
                <EditableTextInput label="Quantity"
                                   type="number"
                                   name="quantity"/>
                <CryptoPlatformDropdown label="Platform"
                                        name="platform"/>
                <SubmitButton text="Add crypto"/>
              </Form>
            </Formik>
          </div> :

          <div className="flex flex-col items-center">
            <div className="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3 my-8 w-2/4"
                 role="alert">
              <p className="font-bold">No Platforms found</p>
              <p className="text-sm">
                Looks like you've no platforms added. Go to <Link to="/platform"><span className="font-bold italic">this link</span></Link> to
                add a platform before adding a crypto.
              </p>
            </div>
          </div>
      }
    </Fragment>
  );
}

export default AddCryptoForm