import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import axios from "axios";
import {TransferCryptoRequest} from "../model/request/usercrypto/TransferCryptoRequest";
import {UserCryptoRequest} from "../model/request/usercrypto/UserCryptoRequest";
import {UserCryptoResponse} from "../model/response/usercrypto/UserCryptoResponse";
import {PageUserCryptoResponse} from "../model/response/usercrypto/PageUserCryptoResponse";
import {TransferCryptoResponse} from "../model/response/usercrypto/TransferCryptoResponse";

const CRYPTOS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/cryptos");
const TRANSFER_CRYPTO_ENDPOINT = CRYPTOS_ENDPOINT.concat("/transfer");

const getCryptosURL = (cryptoId: string) => {
  return `${CRYPTOS_ENDPOINT}/${cryptoId}`;
}

export const getCryptoService = async (cryptoId: string): Promise<UserCryptoResponse> => {
  const cryptoInfoURL = getCryptosURL(cryptoId);

  return await axios.get<UserCryptoResponse>(cryptoInfoURL)
    .then(response => response.data);
}

export const getCryptosByPageService = async (page: number): Promise<PageUserCryptoResponse> => {
  const cryptosURL = `${CRYPTO_BALANCE_TRACKER_URL}/cryptos?page=${page}`;

  return await axios.get<PageUserCryptoResponse>(cryptosURL)
    .then(response => response.data);
}

export const addCryptoService = async (userCryptoRequest: UserCryptoRequest): Promise<UserCryptoResponse> => {
  return await axios.post<UserCryptoResponse>(CRYPTOS_ENDPOINT, userCryptoRequest)
    .then(response => response.data);
}

export const updateCryptoService = async (
  cryptoId: string,
  userCryptoRequest: UserCryptoRequest
): Promise<UserCryptoResponse> => {
  return await axios.put<UserCryptoResponse>(getCryptosURL(cryptoId), userCryptoRequest)
    .then(response => response.data);
}

export const transferCryptoService = async (transferCryptoRequest: TransferCryptoRequest): Promise<TransferCryptoResponse> => {
  return await axios.post<TransferCryptoResponse>(TRANSFER_CRYPTO_ENDPOINT, transferCryptoRequest)
    .then(response => response.data);
}

export const deleteCryptoService = async (cryptoId: string) => {
  const cryptosUrl = getCryptosURL(cryptoId);

  return await axios.delete(cryptosUrl);
}