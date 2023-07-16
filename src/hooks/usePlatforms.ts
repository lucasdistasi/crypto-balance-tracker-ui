import {useEffect, useState} from "react";
import {getPlatformsURL, PLATFORMS_ENDPOINT} from "../constants/Constants";
import {Platform} from "../model/Platform";
import ErrorResponse from "../model/response/ErrorResponse";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export function usePlatforms() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    (async () => {
        try {
          const response = await axios.get(PLATFORMS_ENDPOINT);
          setPlatforms(response.data);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

  const deletePlatform = async (platformId: string) => {
    const platformsURL = getPlatformsURL(platformId);

    try {
      const {status} = await axios.delete(platformsURL);

      if (status === 204) {
        const updatedPlatforms = platforms.filter(platform => platform.name !== platformId);
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
    error,
    loading,
    errors,
    deletePlatform,
  };
}