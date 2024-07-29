import axios from "axios";
import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import {PlatformRequest} from "../model/request/platform/PlatformRequest";
import {PlatformResponse} from "../model/response/platform/PlatformResponse";

const PLATFORMS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/platforms");

const getPlatformsURL = (platformId: string) => {
  return `${PLATFORMS_ENDPOINT}/${platformId}`;
}

export const retrieveAllPlatforms = async (): Promise<Array<PlatformResponse>> => {
  return await axios.get<Array<PlatformResponse>>(PLATFORMS_ENDPOINT)
    .then(response => response.data);
}

export const deletePlatformService = async (platformId: string) => {
  const platformURL = getPlatformsURL(platformId);

  return await axios.delete(platformURL);
}

export const getPlatformService = async (platformId: string): Promise<PlatformResponse> => {
  const platformURL = getPlatformsURL(platformId);

  return await axios.get<PlatformResponse>(platformURL)
    .then(response => response.data);
}

export const updatePlatformService = async (
  platformId: string,
  platformRequest: PlatformRequest
): Promise<PlatformResponse> => {
  const platformURL = getPlatformsURL(platformId);

  return await axios.put<PlatformResponse>(platformURL, platformRequest)
    .then(response => response.data);
}

export const addPlatformService = async (platformRequest: PlatformRequest): Promise<PlatformResponse> => {
  return await axios.post<PlatformResponse>(PLATFORMS_ENDPOINT, platformRequest)
    .then(response => response.data);
}