import {
  CRYPTO_BALANCE_TRACKER_URL
} from "../constants/Constants";
import axios from "axios";

const CRYPTOS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/cryptos");
const TRANSFER_CRYPTO_ENDPOINT = CRYPTOS_ENDPOINT.concat("/transfer");

const getPageCryptosURL = (page: number) => {
  return `${CRYPTO_BALANCE_TRACKER_URL}/cryptos?page=${page}`;
}

const getCryptosURL = (cryptoId: string) => {
  return `${CRYPTOS_ENDPOINT}/${cryptoId}`;
}

export const getCryptosByPageService = async (page: number) => {
  const cryptosURL = getPageCryptosURL(page);
  return await axios.get(cryptosURL)
    .then(response => response.data);
}

export const deleteCryptoService = async (cryptoId: string) => {
  const cryptosUrl = getCryptosURL(cryptoId);
  return await axios.delete(cryptosUrl);
}

export const addCryptoService = async (userCryptoRequest: UserCryptoRequest) => {
  return await axios.post(CRYPTOS_ENDPOINT, userCryptoRequest);
}

export const getCryptoService = async (cryptoId: string) => {
  const cryptoInfoURL = getCryptosURL(cryptoId);
  return await axios.get(cryptoInfoURL)
    .then(response => response.data);
}

export const updateCryptoService = async (cryptoId: string, userCryptoRequest: UserCryptoRequest) => {
  return await axios.put(getCryptosURL(cryptoId), userCryptoRequest);
}

export const transferCryptoService = async (transferCryptoRequest: TransferCryptoRequest) => {
  return await axios.post(TRANSFER_CRYPTO_ENDPOINT, transferCryptoRequest);
}