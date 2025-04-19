import {ErrorMessage, Field, FieldHookConfig, useField} from "formik";
import {usePlatforms} from "../../hooks/usePlatforms";
import React, {Fragment} from "react";
import ErrorAlert from "../page/ErrorAlert";
import SingleFieldSkeleton from "../skeletons/SingleFieldSkeleton";

const CryptoPlatformDropdown = ({label, ...props}: {
  label: string
} & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const {platforms, error, isLoadingPlatforms} = usePlatforms();

  const classes = meta.touched && meta.error ?
    'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 focus:outline-none' :
    'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className="mb-6">
      {
        isLoadingPlatforms && <SingleFieldSkeleton label="Platform" id="platforms-skeleton"/>
      }

      {
        error && <ErrorAlert message="Error isLoadingPlatforms platforms"/>
      }

      {
        !isLoadingPlatforms && !error && platforms?.length > 0 &&
        <Fragment>
          <label htmlFor={props.id ?? props.name}
                 className="text-gray-900 block mb-2 text-sm font-medium dark:text-gray-50">
            {label}
          </label>

          <Field as="select" className={`${classes} border text-sm rounded-lg block w-full p-2.5 dark:bg-dark-input dark:text-gray-50 dark:border-gray-600`}
                 {...field}
                 {...props}>
            <option value="">
              Select Platform
            </option>
            {
              platforms.map(platform => {
                const {id: platformId, name: platformName} = platform;

                return (
                  <option key={platformId} value={platformName}>
                    {
                      platformName
                    }
                  </option>
                );
              })
            }
          </Field>
          <ErrorMessage name={props.id ?? props.name}
                        component="span"
                        className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium"/>
        </Fragment>
      }
    </div>
  );
}

export default CryptoPlatformDropdown