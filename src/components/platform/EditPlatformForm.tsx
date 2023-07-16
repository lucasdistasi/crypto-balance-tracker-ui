import {getPlatformsURL} from "../../constants/Constants";
import axios from "axios";
import React, {useEffect, useState} from "react";
import ErrorResponse from "../../model/response/ErrorResponse";
import {useNavigate, useParams} from "react-router-dom";
import {Form, Formik} from "formik";
import EditableTextInput from "../form/EditableTextInput";
import SubmitButton from "../form/SubmitButton";
import ErrorListAlert from "../page/ErrorListAlert";
import ErrorAlert from "../page/ErrorAlert";
import {platformValidationsSchema} from "../../constants/ValidationSchemas";

const EditPlatformForm = () => {

  const navigate = useNavigate();
  const params = useParams();
  const platformName: string = params.id!!;
  const platformsURL = getPlatformsURL(platformName.toUpperCase());

  const [platformNameResponse, setPlatformNameResponse] = useState({
    name: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<ErrorResponse[]>([]);
  const [fetchInfoError, setFetchInfoError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const {data} = await axios.get(platformsURL);
          setPlatformNameResponse({
            name: data.name
          });
        } catch (err: any) {
          setFetchInfoError(true);
        } finally {
          setIsLoading(false);
        }
      }
    )();
  }, []);

  const updatePlatform = async ({...values}) => {
    const {platformName} = values;

    try {
      await axios.put(platformsURL, {
        name: platformName
      });

      navigate("/platforms");
    } catch (error: any) {
      const {status} = error.response;
      if (status >= 400 && status < 500) {
        setApiResponseError(error.response.data.errors);
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
          `Update ${platformNameResponse.name}`
        }
      </h1>

      {
        apiResponseError && apiResponseError.length >= 1 &&
        <ErrorListAlert
          title="Error updating platform"
          errors={apiResponseError}/>
      }

      {
        fetchInfoError &&
        <ErrorAlert message="Error retrieving platform info"/>
      }

      {
        !fetchInfoError && !isLoading &&
        <Formik
          initialValues={{
            platformName: platformNameResponse.name ?? ''
          }}
          validationSchema={platformValidationsSchema}
          onSubmit={(values, {setSubmitting}) => {
            updatePlatform(values)
          }}>
          <Form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
            <EditableTextInput label="Platform Name"
                               name="platformName"
                               type="text"/>
            <SubmitButton text="Update platform"/>
          </Form>
        </Formik>
      }
    </div>
  );
}

export default EditPlatformForm