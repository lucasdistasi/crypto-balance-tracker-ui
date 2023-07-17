import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import CryptoPlatformDropdown from "../form/CryptoPlatformDropdown";
import EditableTextInput from "../form/EditableTextInput";
import React, {useState} from "react";
import SubmitButton from "../form/SubmitButton";
import ErrorResponse from "../../model/response/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";
import {addCryptoValidationSchema} from "../../constants/ValidationSchemas";
import {addCryptoService} from "../../services/cryptoService";

const AddCryptoForm = () => {

  const navigate = useNavigate();

  const [apiErrors, setApiErrors] = useState<ErrorResponse[]>([]);

  const addCrypto = async ({...values}) => {
    const {cryptoName: coinName, quantity, platform} = values;

    try {
      await addCryptoService({
        coinName,
        quantity,
        platform
      });

      navigate("/cryptos");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiErrors(error.response.data.errors);
      }

      if (status >= 500) {
        navigate("/error");
      }
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        Add Crypto
      </h1>

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
    </div>
  );
}

export default AddCryptoForm