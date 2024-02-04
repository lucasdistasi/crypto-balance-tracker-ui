import React, {Fragment, useState} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import {useNavigate, useParams} from "react-router-dom";
import {useGetCrypto} from "../../hooks/useGetCrypto";
import {usePlatforms} from "../../hooks/usePlatforms";
import ErrorResponse from "../../model/response/ErrorResponse";
import * as Yup from "yup";
import {transferCryptoService} from "../../services/cryptoService";
import FormSkeleton from "../../components/skeletons/FormSkeleton";
import ErrorAlert from "../../components/page/ErrorAlert";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import {Form, Formik} from "formik";
import DisabledTextInput from "../../components/form/DisabledTextInput";
import EditableTextInput from "../../components/form/EditableTextInput";
import CheckboxInput from "../../components/form/CheckboxInput";
import CryptoPlatformDropdown from "../../components/form/CryptoPlatformDropdown";
import SingleFieldSkeleton from "../../components/skeletons/SingleFieldSkeleton";
import SubmitButton from "../../components/form/SubmitButton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";

const TransferCryptoPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const userCryptoId: string = params.id!!;
  const {userCrypto, isLoadingUserCrypto, fetchInfoError} = useGetCrypto();
  const {platforms, isLoadingPlatforms} = usePlatforms();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const redirectTo = urlSearchParams.get('redirectTo') ?? "/cryptos";
  const [apiErrors, setApiErrors] = useState<Array<ErrorResponse>>([]);
  const initialValues = {
    cryptoName: userCrypto?.cryptoName ?? '',
    quantityToTransfer: userCrypto?.quantity ?? 0,
    sendFullQuantity: false,
    networkFee: 0,
    fromPlatform: userCrypto?.platform ?? '',
    toPlatform: ''
  };
  const [isTransferringCrypto, setIsTransferringCrypto] = useState(false);

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
      setIsTransferringCrypto(true);
      await transferCryptoService({
        userCryptoId,
        quantityToTransfer,
        sendFullQuantity,
        networkFee,
        toPlatformId
      });

      navigate(redirectTo);
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiErrors(error.response.data);
      }

      if (status >= 500) {
        navigate("/error");
      }
    } finally {
      setIsTransferringCrypto(false);
    }
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="text-4xl text-gray-900 text-center my-10">
          {
            !isLoadingUserCrypto && `Transfer ${userCrypto?.cryptoName}`
          }
        </h1>

        {
          isLoadingUserCrypto && <FormSkeleton items={6}/>
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
          !isLoadingUserCrypto && !fetchInfoError &&
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
              {
                !isLoadingPlatforms &&
                <CryptoPlatformDropdown label="To platform"
                                        name="toPlatform"/> ||
                <SingleFieldSkeleton label="To platform"
                                     id="to-platform-skeleton"
                                     classes="mb-6"/>
              }

              {
                !isTransferringCrypto &&
                <SubmitButton text={`Transfer ${userCrypto?.cryptoName}`}/> ||
                <DisabledSubmitButton text={`Transfer ${userCrypto?.cryptoName}`}/>
              }
            </Form>
          </Formik>
        }
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(TransferCryptoPage)