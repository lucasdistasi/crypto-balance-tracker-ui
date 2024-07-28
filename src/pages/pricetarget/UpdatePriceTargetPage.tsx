import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {UUID_REGEX} from "../../constants/Constants";
import {retrievePriceTarget, updatePriceTarget} from "../../services/priceTargetService";
import {PriceTargetResponse} from "../../model/response/pricetarget/PriceTargetResponse";
import ErrorResponse from "../../model/response/ErrorResponse";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import ErrorAlert from "../../components/page/ErrorAlert";
import FormSkeleton from "../../components/skeletons/FormSkeleton";
import {Form, Formik} from "formik";
import {updatePriceTargetValidationsSchema} from "../../constants/ValidationSchemas";
import DisabledTextInput from "../../components/form/DisabledTextInput";
import EditableTextInput from "../../components/form/EditableTextInput";
import SubmitButton from "../../components/form/SubmitButton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";

const UpdatePriceTargetPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const priceTargetId: string = params.id!!;

  const [priceTargetResponse, setPriceTargetResponse] = useState<PriceTargetResponse>();
  const [fetchInfoError, setFetchInfoError] = useState(false);
  const [isLoadingPriceTarget, setIsLoadingPriceTarget] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<Array<ErrorResponse>>();
  const [noChangesError, setNoChangesError] = useState(false);

  useEffect(() => {
    (async () => {
      if (UUID_REGEX.test(priceTargetId)) {
        try {
          const priceTarget = await retrievePriceTarget(priceTargetId);
          setPriceTargetResponse(priceTarget);
        } catch (error: any) {
          setFetchInfoError(true);
        } finally {
          setIsLoadingPriceTarget(false);
        }
      } else {
        navigate("/404");
      }
    })()
  }, []);

  const updateTargetPrice = async ({...values}) => {
    const {cryptoName, priceTarget} = values;

    if (String(priceTargetResponse?.priceTarget!) === String(priceTarget)) {
      setNoChangesError(true);
      return;
    }

    try {
      await updatePriceTarget(priceTargetId, {
        cryptoNameOrId: cryptoName,
        priceTarget
      });

      navigate("/price-targets");
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
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        {
          !isLoadingPriceTarget &&
          <h1 className="text-4xl text-gray-900 text-center my-10">
            {
              `Update ${priceTargetResponse?.cryptoName} Target`
            }
          </h1>
        }

        {
          apiResponseError && apiResponseError.length >= 1 &&
          <ErrorListAlert
            title="Error updating price target"
            errors={apiResponseError}/>
        }

        {
          fetchInfoError &&
          <ErrorAlert message="Error retrieving price target info"/>
        }

        {
          noChangesError &&
          <ErrorAlert message="No changes were made"/>
        }

        {
          !fetchInfoError && !isLoadingPriceTarget &&
          <Formik
            initialValues={{
              cryptoName: priceTargetResponse?.cryptoName ?? '',
              priceTarget: priceTargetResponse?.priceTarget ?? 0
            }}
            validationSchema={updatePriceTargetValidationsSchema}
            onSubmit={(values, {setSubmitting}) => {
              updateTargetPrice(values).then(() => setSubmitting(false));
            }}>

            {
              ({isSubmitting}) => (
                <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2" noValidate>
                  <DisabledTextInput label="Crypto Name"
                                     name="cryptoName"
                                     type="text"/>
                  <EditableTextInput label="Price Target"
                                     name="priceTarget"
                                     type="number"/>
                  {
                    !isSubmitting &&
                    <SubmitButton text="Update Price Target"/> ||
                    <DisabledSubmitButton text="Updating Price Target"/>
                  }
                </Form>
              )
            }
          </Formik>
        }

        {
          isLoadingPriceTarget &&
          <FormSkeleton items={2}/>
        }
      </div>
      <Footer/>
    </Fragment>
  )
}

export default withScrollToTop(UpdatePriceTargetPage)