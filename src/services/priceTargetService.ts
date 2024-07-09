import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import {PriceTargetRequest} from "../model/request/pricetarget/PriceTargetRequest";
import axios from "axios";

const PRICE_TARGET_URL = CRYPTO_BALANCE_TRACKER_URL.concat("/price-targets");

export const retrievePriceTarget = async (priceTargetId: string) => {
  const url = PRICE_TARGET_URL.concat(`/${priceTargetId}`);
  return await axios.get(url);
}

export const retrievePriceTargetsByPage = async (page: number) => {
  const url = PRICE_TARGET_URL.concat(`?page=${page}`);
  return await axios.get(url);
}

export const savePriceTarget = async (priceTargetRequest: PriceTargetRequest) => {
  return await axios.post(PRICE_TARGET_URL, priceTargetRequest);
}

export const updatePriceTarget = async (priceTargetId: string, priceTargetRequest: PriceTargetRequest) => {
  const url = PRICE_TARGET_URL.concat(`/${priceTargetId}`);
  return await axios.put(url, priceTargetRequest);
}

export const deletePriceTarget = async (priceTargetId: string) => {
  const url = PRICE_TARGET_URL.concat(`/${priceTargetId}`);
  return await axios.delete(url);
}