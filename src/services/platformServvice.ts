import axios from "axios";
import {CRYPTO_BALANCE_TRACKER_URL, DASHBOARDS_ENDPOINT} from "../constants/Constants";

const PLATFORMS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/platforms");
const DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/crypto/balances/platforms");
const DASHBOARDS_PLATFORMS_BALANCES_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/platform/balances");
const DASHBOARDS_PLATFORMS_CRYPTOS_DISTRIBUTION_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/platforms/coins");
const DASHBOARDS_CRYPTOS_PLATFORMS_DISTRIBUTION_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/cryptos");

const getPlatformsURL = (platformId: string) => {
  return `${PLATFORMS_ENDPOINT}/${platformId}`
}

export const getDashboardsPlatformsCryptosDistributionService = async () => {
  return await axios.get(DASHBOARDS_PLATFORMS_CRYPTOS_DISTRIBUTION_ENDPOINT)
    .then(response => response.data);
}

export const getDashboardsCryptosPlatformsDistributionService = async () => {
  return await axios.get(DASHBOARDS_CRYPTOS_PLATFORMS_DISTRIBUTION_ENDPOINT)
    .then(response => response.data);
}

export const getAllPlatformsService = async () => {
  return await axios.get(PLATFORMS_ENDPOINT)
    .then(response => response.data);
}

export const deletePlatformService = async ({platformId}: {
  platformId: string
}) => {
  const platformURL = getPlatformsURL(platformId);
  return await axios.delete(platformURL);
}

export const getDashboardsCryptosPlatformsBalancesService = async () => {
  return await axios.get(DASHBOARDS_CRYPTOS_PLATFORMS_BALANCES_ENDPOINT)
    .then(response => response.data);
}

export const getDashboardsPlatformsBalancesService = async () => {
  return await axios.get(DASHBOARDS_PLATFORMS_BALANCES_ENDPOINT)
    .then(response => response.data);
}

export const getPlatformService = async ({platformName}: {
  platformName: string
}) => {
  const platformURL = getPlatformsURL(platformName.toUpperCase());
  return await axios.get(platformURL)
    .then(response => response.data);
}

export const updatePlatformService = async ({platformName, platformNewName}: {
  platformName: string,
  platformNewName: string
}) => {
  const platformURL = getPlatformsURL(platformName);
  return await axios.put(platformURL, {
    name: platformNewName
  }).then(response => response);
}

export const addPlatformService = async ({platformName}: {
  platformName: string
}) => {
  return await axios.post(PLATFORMS_ENDPOINT, {
    name: platformName
  });
}