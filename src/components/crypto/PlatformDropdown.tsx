import {usePlatforms} from "../../hooks/usePlatforms";
import ErrorAlert from "../page/ErrorAlert";

const PlatformDropdown = () => {

  const {platforms, error, loading} = usePlatforms();

  return (
    <div className="mb-6">
      {
        error && <ErrorAlert message="Error retrieving platforms"/>
      }

      {
        platforms && !error && !loading &&
        <>
          <label htmlFor="platforms"
                 className="block mb-2 text-sm font-medium text-gray-900">
            Platform
          </label>
          <select id="platforms"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
        </>
      }
    </div>
  );
}

export default PlatformDropdown