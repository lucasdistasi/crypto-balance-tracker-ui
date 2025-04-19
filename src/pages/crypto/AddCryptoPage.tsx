import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {usePlatforms} from "../../hooks/usePlatforms";
import ErrorResponse from "../../model/response/ErrorResponse";
import {addCryptoService} from "../../services/cryptoService";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import {Form, Formik} from "formik";
import {addCryptoValidationSchema} from "../../constants/ValidationSchemas";
import EditableTextInput from "../../components/form/EditableTextInput";
import CryptoPlatformDropdown from "../../components/form/CryptoPlatformDropdown";
import SingleFieldSkeleton from "../../components/skeletons/SingleFieldSkeleton";
import SubmitButton from "../../components/form/SubmitButton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";
import DisabledTextInput from "../../components/form/DisabledTextInput";
import {handleAxiosError} from "../../utils/utils";

const AddCryptoPage = () => {

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const platformName = urlSearchParams.get('platform');
  const redirectTo = urlSearchParams.get('redirectTo') ?? '/cryptos';
  const {isLoadingPlatforms, platforms} = usePlatforms();
  const [apiResponseError, setApiResponseError] = useState<ErrorResponse[]>([]);

  const addCrypto = async (values: {cryptoName: string, quantity: string, platform: string}) => {
    const platformId = platforms.find(platformResponse => platformResponse.name == values.platform)?.id ?? ''

    if (platformId) {
      try {
        await addCryptoService({
          cryptoName: values.cryptoName,
          quantity: values.quantity,
          platformId
        });

        navigate(redirectTo);
      } catch (error: unknown) {
        handleAxiosError(error, setApiResponseError, navigate);
      }
    } else {
      setApiResponseError([{
        title: 'Invalid platform',
        status: 404,
        detail: 'Platform does not exist'
      }])
    }
  }

  return (
    <Fragment>
      <Navbar/>
      <div className="min-h-screen">
        <h1 className="text-4xl text-gray-900 text-center my-10 dark:text-gray-50">
          Add Crypto
        </h1>

        {
          platforms.length > 0 &&
          <div className="flex flex-col items-center">
            {
              apiResponseError && apiResponseError.length >= 1 &&
              <ErrorListAlert
                title="Error adding crypto"
                errors={apiResponseError}/>
            }

            <Formik
              initialValues={{
                cryptoName: '',
                quantity: '0',
                platform: platformName ?? ''
              }}
              validationSchema={addCryptoValidationSchema}
              onSubmit={(values, {setSubmitting}) => {
                addCrypto(values).then(() => setSubmitting(false));
              }}>

              {
                ({isSubmitting}) => (
                  <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2" noValidate>
                    <EditableTextInput label="Crypto name or id"
                                       type="text"
                                       name="cryptoName"
                                       placeholder="Bitcoin"
                                       maxLength={64}/>
                    <EditableTextInput label="Quantity"
                                       type="number"
                                       name="quantity"/>
                    {
                      isLoadingPlatforms &&
                      <SingleFieldSkeleton label="Platform"
                                           id="platforms-skeleton"
                                           classes="mb-6"/>
                    }

                    {
                      !isLoadingPlatforms && platformName &&
                      <DisabledTextInput label="Platform"
                                         name="platform"/>
                    }

                    {
                      !isLoadingPlatforms && !platformName &&
                      <CryptoPlatformDropdown label="Platform"
                                              name="platform"/>
                    }

                    {
                      !isSubmitting &&
                      <SubmitButton text="Add crypto"/> ||
                      <DisabledSubmitButton text="Adding crypto"/>
                    }
                  </Form>
                )
              }
            </Formik>
          </div>
        }

        {
          !isLoadingPlatforms && platforms.length === 0 &&
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
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(AddCryptoPage)