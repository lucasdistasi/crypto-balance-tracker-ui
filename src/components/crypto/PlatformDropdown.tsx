import {usePlatforms} from "../../hooks/usePlatforms";
import ErrorAlert from "../page/ErrorAlert";
import {Fragment} from "react";

const PlatformDropdown = ({...props}) => {

  const {platforms, error, loading} = usePlatforms();
  const {platform, onChangeFunction, classes} = props;

  return (
    <Fragment>
      {
        error && <ErrorAlert message="Error retrieving platforms"/>
      }

      {
        platforms && !error && !loading &&
        <Fragment>
          <label htmlFor="platforms"
                 className="block mb-2 text-sm font-medium text-gray-900">
            Platform
          </label>
          <select id="platforms"
                  defaultValue={platform}
                  onChange={onChangeFunction}
                  className={classes}>
            <option>
              Select Platform
            </option>
            {
              platforms.map(platform => {
                const {name: platformName} = platform;

                return (
                  <option key={platformName}>
                    {
                      platformName
                    }
                  </option>

                );
              })
            }
          </select>
        </Fragment>
      }
    </Fragment>
  );
}

export default PlatformDropdown