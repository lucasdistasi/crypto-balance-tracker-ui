import ActionButton from "../form/ActionButton";
import React, {useState} from "react";
import {PLATFORMS_ENDPOINT} from "../../constants/Constants";
import {NavigateFunction, useNavigate} from "react-router-dom";
import ApiErrorResponse from "../../model/ApiErrorResponse";
import ErrorResponse from "../../model/ErrorResponse";
import ErrorListAlert from "../page/ErrorListAlert";

const AddPlatformForm = () => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [platformName, setPlatformName] = useState("");
  const [platformNameError, setPlatformNameError] = useState(false);

  const redirectToPlatformsPage = (navigate: NavigateFunction) => {
    navigate("/platforms");
  }

  const addPlatform = (platformName: string) => {
    if (!isValidPlatformName(platformName)) {
      setPlatformNameError(true);
      return;
    }

    const body = JSON.stringify({
      name: platformName
    });

    fetch(PLATFORMS_ENDPOINT, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        if (response.ok) {
          redirectToPlatformsPage(navigate);
        } else {
          response.json()
            .then((apiErrorResponse: ApiErrorResponse) => {
              setErrors(apiErrorResponse.errors);
            });
        }
      })
      .catch(error => {
        const errorResponse: ErrorResponse = {
          errorMessage: error.message,
        }

        setErrors([errorResponse]);
      });
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPlatformName(event.target.value);

    if (isValidPlatformName(event.target.value)) {
      setPlatformNameError(false);
    } else {
      setPlatformNameError(true);
    }
  }

  const isValidPlatformName = (platformName: string) => {
    const regex = /^[a-zA-Z]{1,24}$/;

    return regex.test(platformName);
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        Add new Platform
      </h1>

      {
        errors.length >= 1 && <ErrorListAlert title={"Error adding Platform"}
                                              errors={errors}/>
      }

      <form className="my-4 w-10/12 md:w-9/12 lg:w-1/2">
        <div className="mb-6">
          <label htmlFor="base-input"
                 className={`${platformNameError ?
                   'text-red-500' :
                   'text-gray-900'}
                   block mb-2 text-sm font-medium`}>
            Platform Name
          </label>
          <input type="text"
                 id="base-input"
                 autoComplete="off"
                 value={platformName}
                 onChange={event => handleInputChange(event)}
                 placeholder="Binance"
                 minLength={1}
                 maxLength={24}
                 className={`${platformNameError ?
                   'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 focus:outline-none ' :
                   'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 '}
                   border text-sm rounded-lg block w-full p-2.5`}/>

          {
            platformNameError &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
              Platform name must be 1-24 characters long, no numbers, special characters or whitespace allowed.
            </p>
          }

        </div>
        <ActionButton text="Add Platform"
                      actionFunction={() => addPlatform(platformName)}/>
      </form>
    </div>
  );
}

export default AddPlatformForm