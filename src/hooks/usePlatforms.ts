import React, {useEffect, useState} from "react";
import {getPlatformsURL, PLATFORMS_ENDPOINT} from "../constants/Constants";
import Platform from "../model/Platform";
import ErrorResponse from "../response/ErrorResponse";
import {NavigateFunction, useNavigate} from "react-router-dom";
import axios from "axios";

export function usePlatforms() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [platformName, setPlatformName] = useState("");
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformNameError, setPlatformNameError] = useState(false);

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

  const redirectToPlatformsPage = (navigate: NavigateFunction) => {
    navigate("/platforms");
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

  const addPlatform = async (platformName: string) => {
    if (!isValidPlatformName(platformName)) {
      setPlatformNameError(true);
      return;
    }

    try {
      await axios.post(PLATFORMS_ENDPOINT, {
        name: platformName
      });
      redirectToPlatformsPage(navigate);
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

  const updatePlatform = async (platformName: string) => {
    if (!isValidPlatformName(platformName)) {
      setPlatformNameError(true);
      return;
    }

    const updatePlatformName: string = window.location.pathname.split('/').pop() ?? "";
    const platformsURL = getPlatformsURL(updatePlatformName);

    try {
      const response = await axios.put(platformsURL, {
        name: platformName
      });

      if (response.status === 200) {
        redirectToPlatformsPage(navigate);
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
    platformName,
    errors,
    platformNameError,
    addPlatform,
    deletePlatform,
    updatePlatform,
    handleInputChange,
    setPlatformName,
  };
}