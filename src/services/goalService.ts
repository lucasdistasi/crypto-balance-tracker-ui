import axios from "axios";
import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";

const GOALS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/goals");

const getGoalURL = (goalId: string) => {
  return `${GOALS_ENDPOINT}/${goalId}`;
}

export const getGoalsByPageService = async (page: number) => {
  const pageGoalsEndpoint = `${GOALS_ENDPOINT}?page=${page}`;

  return await axios.get(pageGoalsEndpoint)
    .then(response => response.data);
}

export const retrieveGoal = async (goalId: string) => {
  return await axios.get(getGoalURL(goalId)).then(response => response.data);
}

export const updateGoal = async ({goalId, cryptoName, goalQuantity}: {
  goalId: string,
  cryptoName: string,
  goalQuantity: bigint
}) => {
  return await axios.put(getGoalURL(goalId), {
    cryptoName,
    goalQuantity
  }).then(response => response.data);
}

export const saveGoal = async ({cryptoName, goalQuantity}: {
  cryptoName: string,
  goalQuantity: bigint
}) => {
  return await axios.post(GOALS_ENDPOINT, {
    cryptoName,
    goalQuantity
  }).then(response => response.data);
}

export const deleteGoalService = async ({goalId}: {
  goalId: string
}) => {
  const deleteGoalUrl = GOALS_ENDPOINT.concat(`/${goalId}`);
  return await axios.delete(deleteGoalUrl)
    .then(response => response);
}