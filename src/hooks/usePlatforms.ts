import {useEffect, useState} from "react";
import {PLATFORMS_ENDPOINT} from "../constants/Constants";
import Platform from "../model/Platform";

export function usePlatforms() {

  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(PLATFORMS_ENDPOINT, {
      method: "GET",
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

  return { platforms, error, loading };
}