import {useEffect, useState} from "react";
import {Platform} from "../model/Platform";
import ErrorResponse from "../model/response/ErrorResponse";
import {useNavigate} from "react-router-dom";
import {deletePlatformService, getAllPlatformsService} from "../services/platformServvice";

export function usePlatforms() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    (async () => {
        try {
          const response = await getAllPlatformsService();
          setPlatforms(response);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )();
  }, []);

  const deletePlatform = async (platformId: string) => {
    try {
      const {status} = await deletePlatformService({platformId});

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