import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import ErrorResponse from "../../model/response/ErrorResponse";
import {Form, Formik} from "formik";
import EditableTextInput from "../form/EditableTextInput";
import CryptoPlatformDropdown from "../form/CryptoPlatformDropdown";
import SubmitButton from "../form/SubmitButton";
import ErrorAlert from "../page/ErrorAlert";
import ErrorListAlert from "../page/ErrorListAlert";
import DisabledTextInput from "../form/DisabledTextInput";
import {updateCryptoValidationSchema} from "../../constants/ValidationSchemas";
import {updateCryptoService} from "../../services/cryptoService";
import {useGetCrypto} from "../../hooks/useGetCrypto";
import {usePlatforms} from "../../hooks/usePlatforms";

const UpdateCryptoForm = () => {

  const navigate = useNavigate();
  const params = useParams();
  const cryptoId: string = params.id!!;

  const {platforms} = usePlatforms()
  const {userCrypto, isLoading, fetchInfoError} = useGetCrypto();
  const [apiResponseError, setApiResponseError] = useState<ErrorResponse[]>([]);
  const [noChangesError, setNoChangesError] = useState(false);

  const updateCrypto = async ({...values}) => {
    const {cryptoName, quantity, platform} = values;

    if (userCrypto?.quantity === quantity.toString() && userCrypto?.platform === platform) {
      setNoChangesError(true);
      return;
    }

    const platformId = platforms.find(p => platform == p.name)?.id ?? ""

    try {
      await updateCryptoService({
        cryptoId,
        cryptoName,
        quantity,
        platformId
      });

      navigate("/cryptos");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiResponseError(error.response.data);
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
          `Update ${userCrypto?.cryptoName}`
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
            cryptoName: userCrypto?.cryptoName ?? '',
            quantity: userCrypto?.quantity ?? 0,
            platform: userCrypto?.platform ?? ''
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

export default UpdateCryptoForm