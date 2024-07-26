import {useEffect, useState} from "react";
import ErrorResponse from "../model/response/ErrorResponse";
import {useNavigate} from "react-router-dom";
import {deletePlatformService, retrieveAllPlatforms} from "../services/platformService";
import {PlatformResponse} from "../model/response/platform/PlatformResponse";
import {isSuccessfulStatus} from "../utils/utils";

export function usePlatforms() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(true);
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [platforms, setPlatforms] = useState<Array<PlatformResponse>>([]);

  useEffect(() => {
    (async () => {
        try {
          const response = await retrieveAllPlatforms();
          setPlatforms(response);
        } catch (err) {
          setError(true);
        } finally {
          setIsLoadingPlatforms(false);
        }
      }
    )();
  }, []);

  const deletePlatform = async (platformId: string) => {
    try {
      const {status} = await deletePlatformService(platformId);

      if (isSuccessfulStatus(status)) {
        const updatedPlatforms = platforms.filter(platform => platform.id !== platformId);
        setPlatforms(updatedPlatforms);
      }
    } catch (err: any) {
      const {status, data} = err.response;
      if (status === 400) {
        setErrors(data.errors);
      }

      if (status >= 500) {
        navigate("/error");
      }
    }
  }

  return {
    platforms,
    setPlatforms,
    error,
    isLoadingPlatforms,
    errors,
    deletePlatform,
  };
}