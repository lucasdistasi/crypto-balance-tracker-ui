import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import EditableTextInput from "../form/EditableTextInput";
import DisabledTextInput from "../form/DisabledTextInput";
import SubmitButton from "../form/SubmitButton";
import CryptoPlatformDropdown from "../form/CryptoPlatformDropdown";
import ErrorAlert from "../page/ErrorAlert";
import InfoFormSkeleton from "../skeletons/InfoFormSkeleton";
import ErrorResponse from "../../model/response/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";
import {transferCryptoService} from "../../services/cryptoService";
import {useGetCrypto} from "../../hooks/useGetCrypto";
import CheckboxInput from "../form/CheckboxInput";
import {usePlatforms} from "../../hooks/usePlatforms";

const TransferCryptoForm = () => {

  const navigate = useNavigate();
  const params = useParams();
  const userCryptoId: string = params.id!!;
  const {userCrypto, isLoading, fetchInfoError} = useGetCrypto();
  const {platforms} = usePlatforms()

  const [apiErrors, setApiErrors] = useState<Array<ErrorResponse>>([]);

  const initialValues = {
    cryptoName: userCrypto?.cryptoName ?? '',
    quantityToTransfer: userCrypto?.quantity ?? 0,
    sendFullQuantity: false,
    networkFee: 0,
    fromPlatform: userCrypto?.platform ?? '',
    toPlatform: ''
  };

  const validationSchema = Yup.object({
    networkFee: Yup.number()
      .required("Network fee is required")
      .min(0, "Network fee cant be a negative number")
      .max(Number(userCrypto?.quantity!), "Network fee cant be higher than quantity to transfer"),
    quantityToTransfer: Yup.number()
      .required("Quantity to transfer is required")
      .max(Number(userCrypto?.quantity!), "Quantity to transfer can't be higher than current quantity")
      .moreThan(0, "Quantity to transfer can't be zero or a negative number"),
    toPlatform: Yup.string()
      .required("Select a valid To Platform")
      .notOneOf([userCrypto?.platform], "Can't be same as from platform")
  });

  const transferCrypto = async ({...props}) => {
    const {quantityToTransfer, sendFullQuantity, networkFee, toPlatform} = props;
    const toPlatformId = platforms.find(platform => platform.name == toPlatform)?.id ?? '';

    try {
      await transferCryptoService({
        userCryptoId,
        quantityToTransfer,
        sendFullQuantity,
        networkFee,
        toPlatformId
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
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        {
          `Transfer ${userCrypto?.cryptoName}`
        }
      </h1>

      {
        isLoading && <InfoFormSkeleton/>
      }

      {
        fetchInfoError && <ErrorAlert message="Error retrieving crypto information"/>
      }

      {
        apiErrors && apiErrors.length >= 1 &&
        <ErrorListAlert
          title="Error transfering crypto"
          errors={apiErrors}/>
      }

      {
        !isLoading && !fetchInfoError &&
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting}) => {
            transferCrypto(values)
          }}>
          <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
            <DisabledTextInput label="Crypto Name"
                               type="text"
                               name="cryptoName"/>
            <EditableTextInput label="Quantity to transfer"
                               name="quantityToTransfer"
                               type="number"
                               max={userCrypto?.quantity}/>
            <CheckboxInput label="Send full quantity"
                           name="sendFullQuantity"/>
            <EditableTextInput label="Network fee"
                               name="networkFee"
                               type="number"
                               max={userCrypto?.quantity}/>
            <DisabledTextInput label="From platform"
                               type="text"
                               name="fromPlatform"/>
            <CryptoPlatformDropdown label="To platform"
                                    name="toPlatform"/>

            <SubmitButton text={`Transfer ${userCrypto?.cryptoName}`}/>
          </Form>
        </Formik>
      }
    </div>
  );
}

export default TransferCryptoForm