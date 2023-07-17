import axios from "axios";
import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";

const GOALS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/goals");

const getGoalURL = (goalId: string) => {
  return `${GOALS_ENDPOINT}/${goalId}`
}

export const getAllGoalsService = async () => {
  return await axios.get(GOALS_ENDPOINT).then(response => response.data);
}

export const getGoalService = async ({goalId}: {
  goalId: string
}) => {
  return await axios.get(getGoalURL(goalId)).then(response => response.data);
}

export const updateGoalService = async ({goalId, quantityGoal}: {
  goalId: string,
  quantityGoal: bigint
}) => {
  return await axios.put(getGoalURL(goalId), {
    quantityGoal
  }).then(response => response.data);
}

export const addGoalService = async ({cryptoName, quantityGoal}: {
  cryptoName: string,
  quantityGoal: bigint
}) => {
  return await axios.post(GOALS_ENDPOINT, {
    cryptoName,
    quantityGoal
  }).then(response => response.data)
}

export const deleteGoalService = async ({goalId}: {
  goalId: string
}) => {
  const deleteGoalUrl = GOALS_ENDPOINT.concat(`/${goalId}`);
  return await axios.delete(deleteGoalUrl)
    .then(response => response);
}