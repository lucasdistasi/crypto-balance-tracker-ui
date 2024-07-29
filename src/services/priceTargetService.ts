import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import {PriceTargetRequest} from "../model/request/pricetarget/PriceTargetRequest";
import axios from "axios";
import {PriceTargetResponse} from "../model/response/pricetarget/PriceTargetResponse";
import {PagePriceTargetResponse} from "../model/response/pricetarget/PagePriceTargetResponse";

const PRICE_TARGET_URL = CRYPTO_BALANCE_TRACKER_URL.concat("/price-targets");

export const retrievePriceTarget = async (priceTargetId: string): Promise<PriceTargetResponse> => {
  const url = PRICE_TARGET_URL.concat(`/${priceTargetId}`);

  return await axios.get<PriceTargetResponse>(url)
    .then(response => response.data);
}

export const retrievePriceTargetsByPage = async (page: number): Promise<PagePriceTargetResponse> => {
  const url = PRICE_TARGET_URL.concat(`?page=${page}`);

  return await axios.get<PagePriceTargetResponse>(url)
    .then(response => response.data);
}

export const savePriceTarget = async (priceTargetRequest: PriceTargetRequest): Promise<PriceTargetResponse> => {
  return await axios.post<PriceTargetResponse>(PRICE_TARGET_URL, priceTargetRequest)
    .then(response => response.data);
}

export const updatePriceTarget = async (
  priceTargetId: string,
  priceTargetRequest: PriceTargetRequest
): Promise<PriceTargetResponse> => {
  const url = PRICE_TARGET_URL.concat(`/${priceTargetId}`);

  return await axios.put<PriceTargetResponse>(url, priceTargetRequest)
    .then(response => response.data);
}

export const deletePriceTarget = async (priceTargetId: string) => {
  const url = PRICE_TARGET_URL.concat(`/${priceTargetId}`);

  return await axios.delete(url);
}