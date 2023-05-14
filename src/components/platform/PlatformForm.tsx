import ActionButton from "../form/ActionButton";
import {usePlatforms} from "../../hooks/usePlatforms";
import ErrorListAlert from "../page/ErrorListAlert";
import {FORM_ACTION} from "../../model/FormAction";
import React, {useEffect} from "react";
import {getPlatformsURL} from "../../constants/Constants";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PlatformForm = ({action}: { action: FORM_ACTION }) => {

  const {
    errors,
    platformNameError,
    platformName,
    setPlatformName,
    handleInputChange,
    addPlatform,
    updatePlatform,
  } = usePlatforms();
  const navigate = useNavigate();
  const errorMessage: string = `Error ${action === FORM_ACTION.ADD ? 'adding' : 'updating'} platform`;
  const title: string = action === FORM_ACTION.ADD ? "Add new Platform" : "Update Platform";

  useEffect(() => {
    if (action === FORM_ACTION.UPDATE) {
      (async () => {
          const platformId: string = window.location.pathname.split('/').pop() ?? "";
          const platformInfoURL = getPlatformsURL(platformId.toUpperCase());

          try {
            const {data} = await axios.get(platformInfoURL);
            setPlatformName(data.name);
          } catch (err: any) {
            const {status} = err.response;

            redirectToPage(status);
          }
        }
      )();
    }
  }, []);

  const redirectToPage = (status: number) => {
    if (status === 404) {
      navigate("/404");
    }

    if (status >= 500) {
      navigate("/error");
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl text-gray-900 text-center my-10">
        {
          title
        }
      </h1>

      {
        errors.length >= 1 &&
        <ErrorListAlert title={errorMessage} errors={errors}/>
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
        {
          action === FORM_ACTION.ADD &&
          <ActionButton text="Add Platform"
                        actionFunction={() => addPlatform(platformName)}/>
        }
        {
          action === FORM_ACTION.UPDATE &&
          <ActionButton text="Update Platform"
                        actionFunction={() => updatePlatform(platformName)}/>
        }
      </form>
    </div>
  );
}

export default PlatformForm