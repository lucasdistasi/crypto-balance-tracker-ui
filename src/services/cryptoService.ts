import {
  CRYPTO_BALANCE_TRACKER_URL,
  DASHBOARDS_ENDPOINT
} from "../constants/Constants";
import axios from "axios";

const CRYPTOS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/cryptos");
const ALL_CRYPTOS_DASHBOARD_ENDPOINT = DASHBOARDS_ENDPOINT.concat("/crypto/balances");
const TRANSFER_CRYPTO_ENDPOINT = CRYPTOS_ENDPOINT.concat("/transfer");

const getPageCryptosURL = (page: number) => {
  return `${CRYPTO_BALANCE_TRACKER_URL}/cryptos?page=${page}`;
}

const getCryptosURL = (cryptoId: string) => {
  return `${CRYPTOS_ENDPOINT}/${cryptoId}`
}

export const getCryptosByPageService = async ({page}:{
  page: number
}) => {
  const cryptosURL = getPageCryptosURL(page);
  return await axios.get(cryptosURL)
    .then(response => response.data);
}

export const deleteCryptoService = async ({cryptoId}:{
  cryptoId: string
}) => {
  const cryptosUrl = getCryptosURL(cryptoId);
  return await axios.delete(cryptosUrl)
    .then(response => response);
}

export const addCryptoService = async ({cryptoName, quantity, platform}:{
  cryptoName: string,
  quantity: bigint,
  platform: string
}) => {
  return await axios.post(CRYPTOS_ENDPOINT, {
    cryptoName,
    quantity,
    platform,
  });
}

export const getCryptoService = async ({cryptoId}: {
  cryptoId: string
}) => {
  const cryptoInfoURL = getCryptosURL(cryptoId);
  return await axios.get(cryptoInfoURL)
    .then(response => response.data);
}

export const updateCryptoService = async ({cryptoId, quantity, platform}:{
  cryptoId: string,
  quantity: bigint,
  platform: string
}) => {
  return await axios.put(getCryptosURL(cryptoId), {
    quantity,
    platform
  });
}

export const getAllCryptosDashboardService = async () => {
  return await axios.get(ALL_CRYPTOS_DASHBOARD_ENDPOINT)
    .then(response => response.data);
}

export const transferCryptoService = async ({cryptoId, quantityToTransfer, networkFee, toPlatform}: {
  cryptoId: string,
  quantityToTransfer: bigint,
  networkFee: bigint,
  toPlatform: string
}) => {
  return await axios.post(TRANSFER_CRYPTO_ENDPOINT, {
    cryptoId,
    quantityToTransfer,
    networkFee,
    toPlatform
  });
}