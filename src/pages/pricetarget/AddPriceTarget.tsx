import withScrollToTop from "../../hoc/withScrollToTop";
import React, {Fragment, useState} from "react";
import Navbar from "../../components/page/Navbar";
import Footer from "../../components/page/Footer";
import ErrorListAlert from "../../components/page/ErrorListAlert";
import {Form, Formik} from "formik";
import {addPriceTargetValidationsSchema} from "../../constants/ValidationSchemas";
import EditableTextInput from "../../components/form/EditableTextInput";
import SubmitButton from "../../components/form/SubmitButton";
import DisabledSubmitButton from "../../components/form/DisabledSubmitButton";
import {useNavigate} from "react-router-dom";
import ErrorResponse from "../../model/response/ErrorResponse";
import {savePriceTarget} from "../../services/priceTargetService";
import axios from "axios";

const AddPriceTarget = () => {

  const navigate = useNavigate();
  const [apiResponseError, setApiResponseError] = useState<Array<ErrorResponse>>([]);

  const addPriceTarget = async (values: {cryptoNameOrId: string, priceTarget: string}) => {
    try {
      await savePriceTarget({
        cryptoNameOrId: values.cryptoNameOrId,
        priceTarget: Number(values.priceTarget)
      })

      navigate('/price-targets');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status && (status >= 400 && status < 500)) {
          setApiResponseError(error.response?.data);
          return;
        }
      }

      navigate("/error");
    }
  }

  return(
    <Fragment>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="text-4xl text-gray-900 text-center my-10">
          Add Price Target
        </h1>
        {
          apiResponseError && apiResponseError.length >= 1 &&
          <ErrorListAlert
            title="Error adding platform"
            errors={apiResponseError}/>
        }

        <Formik
          initialValues={{
            cryptoNameOrId: '',
            priceTarget: '0'
          }}
          validationSchema={addPriceTargetValidationsSchema}
          onSubmit={(values, {setSubmitting}) => {
            addPriceTarget(values).then(() => setSubmitting(false));
          }}>

          {
            ({isSubmitting}) => (
              <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
                <EditableTextInput label="Crypto Name or ID"
                                   type="text"
                                   name="cryptoNameOrId"
                                   placeholder="Bitcoin"
                                   maxLength={64}/>
                <EditableTextInput label="Price Target"
                                   type="text"
                                   name="priceTarget"/>

                {
                  !isSubmitting &&
                  <SubmitButton text="Add Price Target"/> ||
                  <DisabledSubmitButton text="Adding Price Target"/>
                }
              </Form>
            )
          }
        </Formik>
      </div>
      <Footer/>
    </Fragment>
  );
}

export default withScrollToTop(AddPriceTarget)