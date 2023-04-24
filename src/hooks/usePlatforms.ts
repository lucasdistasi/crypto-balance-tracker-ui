import React, {useEffect, useState} from "react";
import {getPlatformsURL, PLATFORMS_ENDPOINT} from "../constants/Constants";
import Platform from "../model/Platform";
import {HTTP_METHOD} from "../model/HttpMethod";
import ErrorResponse from "../model/ErrorResponse";
import ApiErrorResponse from "../model/ApiErrorResponse";
import {NavigateFunction, useNavigate} from "react-router-dom";

export function usePlatforms() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [platformName, setPlatformName] = useState("");
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformNameError, setPlatformNameError] = useState(false);

  useEffect(() => {
    fetch(PLATFORMS_ENDPOINT, {
      method: HTTP_METHOD.GET,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        setLoading(true);
        return response.json();
      })
      .then(data => {
        setPlatforms(data);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });
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

  const addPlatform = (platformName: string) => {
    if (!isValidPlatformName(platformName)) {
      setPlatformNameError(true);
      return;
    }

    const body = JSON.stringify({
      name: platformName
    });

    fetch(PLATFORMS_ENDPOINT, {
      method: HTTP_METHOD.POST,
      body: body,
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      if (response.ok) {
        redirectToPlatformsPage(navigate);
      } else {
        response.json()
          .then((apiErrorResponse: ApiErrorResponse) => {
            setErrors(apiErrorResponse.errors);
          });
      }
    }).catch(error => {
      const errorResponse: ErrorResponse = {
        errorMessage: error.message,
      }

      setErrors([errorResponse]);
    });
  }

  const updatePlatform = (platformName: string) => {
    if (!isValidPlatformName(platformName)) {
      setPlatformNameError(true);
      return;
    }

    const updatePlatformName: string = window.location.pathname.split('/').pop() ?? "";
    const platformsURL = getPlatformsURL(updatePlatformName);

    const body = JSON.stringify({
      name: platformName
    });

    fetch(platformsURL, {
      method: HTTP_METHOD.PUT,
      body: body,
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      if (response.ok) {
        redirectToPlatformsPage(navigate);
      } else {
        response.json()
          .then((apiErrorResponse: ApiErrorResponse) => {
            setErrors(apiErrorResponse.errors);
          });
      }
    }).catch(error => {
      const errorResponse: ErrorResponse = {
        errorMessage: error.message,
      }

      setErrors([errorResponse]);
    });
  }

  const deletePlatform = (platformId: string) => {
    const platformsURL = getPlatformsURL(platformId);

    fetch(platformsURL, {
      method: HTTP_METHOD.DELETE
    })
      .then(response => {
        if (response.status === 204) {
          const updatedPlatforms = platforms.filter(platform => platform.name !== platformId);
          setPlatforms(updatedPlatforms);
        }
      });
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