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

const TransferCryptoForm = () => {

  const navigate = useNavigate();
  const params = useParams();
  const cryptoId: string = params.id!!;
  const {crypto, isLoading, fetchInfoError} = useGetCrypto();

  const [apiErrors, setApiErrors] = useState<ErrorResponse[]>([]);

  const initialValues = {
    cryptoName: crypto?.cryptoName ?? '',
    quantityToTransfer: crypto?.quantity ?? 0,
    networkFee: 0,
    fromPlatform: crypto?.platform ?? '',
    toPlatform: ''
  };

  const validationSchema = Yup.object({
    networkFee: Yup.number()
      .required("Network fee is required")
      .min(0, "Network fee cant be a negative number")
      .max(Number(crypto?.quantity!), "Network fee cant be higher than quantity to transfer"),
    quantityToTransfer: Yup.number()
      .required("Quantity to transfer is required")
      .max(Number(crypto?.quantity!), "Quantity to transfer can't be higher than current quantity")
      .moreThan(0, "Quantity to transfer can't be zero or a negative number"),
    toPlatform: Yup.string()
      .required("Select a valid To Platform")
      .notOneOf([crypto?.platform], "Can't be same as from platform")
  });

  const transferCrypto = async ({...props}) => {
    const {quantityToTransfer, networkFee, toPlatform} = props

    try {
      await transferCryptoService({
        cryptoId,
        quantityToTransfer,
        networkFee,
        toPlatform
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
        {
          `Transfer ${crypto?.cryptoName}`
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
                               max={crypto?.quantity}/>
            <EditableTextInput label="Network fee"
                               name="networkFee"
                               type="number"
                               max={crypto?.quantity}/>
            <DisabledTextInput label="From platform"
                               type="text"
                               name="fromPlatform"/>
            <CryptoPlatformDropdown label="To platform"
                                    name="toPlatform"/>

            <SubmitButton text={`Transfer ${crypto?.cryptoName}`}/>
          </Form>
        </Formik>
      }
    </div>
  );
}

export default TransferCryptoForm