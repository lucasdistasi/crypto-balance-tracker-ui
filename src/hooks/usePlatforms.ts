import {useEffect, useState} from "react";
import ErrorResponse from "../model/response/ErrorResponse";
import {deletePlatformService, retrieveAllPlatforms} from "../services/platformService";
import {PlatformResponse} from "../model/response/platform/PlatformResponse";
import {handleAxiosError} from "../utils/utils";
import {useNavigate} from "react-router-dom";

export function usePlatforms() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(true);
  const [apiResponseError, setApiResponseError] = useState<ErrorResponse[]>([]);
  const [platforms, setPlatforms] = useState<Array<PlatformResponse>>([]);

  useEffect(() => {
    (async () => {
        try {
          const response = await retrieveAllPlatforms();
          setPlatforms(response);
        } catch (error: unknown) {
          setError(true);
        } finally {
          setIsLoadingPlatforms(false);
        }
      }
    )();
  }, []);

  const deletePlatform = async (platformId: string) => {
    try {
      await deletePlatformService(platformId)
        .then(() => {
          const updatedPlatforms = platforms.filter(platform => platform.id !== platformId);
          setPlatforms(updatedPlatforms);
        });
    } catch (error: unknown) {
      handleAxiosError(error, setApiResponseError, navigate);
    }
  }

  return {
    platforms,
    setPlatforms,
    error,
    isLoadingPlatforms,
    errors: apiResponseError,
    deletePlatform,
  };
}