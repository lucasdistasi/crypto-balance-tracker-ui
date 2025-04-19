import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {usePlatforms} from "../../hooks/usePlatforms";
import {useGetCrypto} from "../../hooks/useGetCrypto";
import ErrorResponse from "../../model/response/ErrorResponse";
import {updateCryptoService} from "../../services/cryptoService";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import ErrorAlert from "../../components/page/ErrorAlert";
import {Form, Formik} from "formik";
import {updateCryptoValidationSchema} from "../../constants/ValidationSchemas";
import DisabledTextInput from "../../components/form/DisabledTextInput";
import EditableTextInput from "../../components/form/EditableTextInput";
import CryptoPlatformDropdown from "../../components/form/CryptoPlatformDropdown";
import SingleFieldSkeleton from "../../components/skeletons/SingleFieldSkeleton";
import SubmitButton from "../../components/form/SubmitButton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";
import FormSkeleton from "../../components/skeletons/FormSkeleton";
import {handleAxiosError} from "../../utils/utils";

const UpdateCryptoPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const cryptoId: string = params.id!;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const redirectTo = urlSearchParams.get('redirectTo') ?? "/cryptos";
  const {platforms, isLoadingPlatforms} = usePlatforms();
  const {userCrypto, isLoadingUserCrypto, fetchInfoError} = useGetCrypto();
  const [apiResponseError, setApiResponseError] = useState<ErrorResponse[]>([]);
  const [noChangesError, setNoChangesError] = useState(false);

  const updateCrypto = async ({cryptoName, quantity, platform}: {
    cryptoName: string,
    quantity: string,
    platform: string
  }) => {
    if (userCrypto?.quantity === quantity && userCrypto?.platform === platform) {
      setNoChangesError(true);
      return;
    }

    const platformId = platforms.find(p => platform == p.name)?.id ?? ""

    try {
      await updateCryptoService(cryptoId, {
        cryptoName,
        quantity: quantity,
        platformId
      });

      navigate(redirectTo);
    } catch (error: unknown) {
      handleAxiosError(error, setApiResponseError, navigate);
    }
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="text-4xl text-gray-900 text-center my-10 dark:text-gray-50">
          {
            !fetchInfoError && !isLoadingUserCrypto && `Update ${userCrypto?.cryptoName}`
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
          isLoadingUserCrypto && <FormSkeleton items={3}/>
        }

        {
          !fetchInfoError && !isLoadingUserCrypto &&
          <Formik
            initialValues={{
              cryptoName: userCrypto?.cryptoName ?? '',
              quantity: String(userCrypto?.quantity ?? 0),
              platform: userCrypto?.platform ?? ''
            }}
            validationSchema={updateCryptoValidationSchema}
            onSubmit={(values, {setSubmitting}) => {
              updateCrypto(values).then(() => setSubmitting(false));
            }}>

            {
              ({isSubmitting}) => (
                <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2" noValidate>
                  <DisabledTextInput label="Crypto name or id"
                                     type="text"
                                     name="cryptoName"/>
                  <EditableTextInput label="Quantity"
                                     type="number"
                                     name="quantity"/>
                  {
                    !isLoadingPlatforms &&
                    <CryptoPlatformDropdown label="Platform"
                                            name="platform"/> ||
                    <SingleFieldSkeleton label="Platform"
                                         id="platforms-skeleton"
                                         classes="mb-6"/>
                  }

                  {
                    !isSubmitting &&
                    <SubmitButton text="Update crypto"/> ||
                    <DisabledSubmitButton text="Updating crypto"/>
                  }
                </Form>
              )
            }
          </Formik>
        }
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(UpdateCryptoPage)