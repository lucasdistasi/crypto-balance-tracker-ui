import {ErrorMessage, useField} from "formik";
import {usePlatforms} from "../../hooks/usePlatforms";
import React, {Fragment} from "react";
import Spinner from "../page/Spinner";
import ErrorAlert from "../page/ErrorAlert";
import {Link} from "react-router-dom";

const CryptoPlatformDropdown = ({label, ...props}) => {
  const [field, meta] = useField(props);
  const {platforms, error, loading} = usePlatforms();

  const classes = meta.touched && meta.error ?
    'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 focus:outline-none' :
    'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className="mb-6">
      {
        loading && <Spinner/>
      }

      {
        error && <ErrorAlert message="Error loading platforms"/>
      }

      {
        !loading && !error && (!platforms || platforms?.length == 0) &&
        <div className="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3 my-8 w-11/12" role="alert">
          <p className="font-bold">No Platforms found</p>
          <p className="text-sm">
            Looks like you've no platforms added. Go to <Link to="/platform"><span className="font-bold italic">this link</span></Link> to add a platform before adding a crypto.
          </p>
        </div>

      }

      {
        !loading && !error && platforms?.length > 0 &&
        <Fragment>
          <label htmlFor={props.id || props.name}
                 className="text-gray-900 block mb-2 text-sm font-medium">
            {label}
          </label>

          <select className={`${classes} border text-sm rounded-lg block w-full p-2.5`}
                  {...field}
                  {...props}>
            <option value="">
              Select Platform
            </option>
            {
              platforms.map(platform => {
                const {name: platformName} = platform;

                return (
                  <option key={platformName} value={platformName}>
                    {
                      platformName
                    }
                  </option>

                );
              })
            }
          </select>
          <ErrorMessage name={props.id || props.name}
                        component="span"
                        className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium"/>
        </Fragment>
      }
    </div>
  );
}

export default CryptoPlatformDropdown