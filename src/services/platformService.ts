import axios from "axios";
import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";

const PLATFORMS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/platforms");

const getPlatformsURL = (platformId: string) => {
  return `${PLATFORMS_ENDPOINT}/${platformId}`;
}

export const retrieveAllPlatforms = async () => {
  return await axios.get(PLATFORMS_ENDPOINT)
    .then(response => response.data);
}

export const deletePlatformService = async (platformId: string) => {
  const platformURL = getPlatformsURL(platformId);
  return await axios.delete(platformURL);
}

export const getPlatformService = async (platformId: string) => {
  const platformURL = getPlatformsURL(platformId);
  return await axios.get(platformURL)
    .then(response => response.data);
}

export const updatePlatformService = async ({platformId, platformName}: {
  platformId: string,
  platformName: string
}) => {
  const platformURL = getPlatformsURL(platformId);
  return await axios.put(platformURL, {
    name: platformName
  }).then(response => response);
}

export const addPlatformService = async ({platformName}: {
  platformName: string
}) => {
  return await axios.post(PLATFORMS_ENDPOINT, {
    name: platformName
  });
}