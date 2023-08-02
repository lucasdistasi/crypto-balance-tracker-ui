import axios from "axios";
import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";

const GOALS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/goals");

const getGoalURL = (goalId: string) => {
  return `${GOALS_ENDPOINT}/${goalId}`
}

export const getGoalsByPageService = async (page: number) => {
  const pageGoalsEndpoint = `${GOALS_ENDPOINT}?page=${page}`

  return await axios.get(pageGoalsEndpoint)
    .then(response => response.data);
}

export const getGoalService = async ({goalId}: {
  goalId: string
}) => {
  return await axios.get(getGoalURL(goalId)).then(response => response.data);
}

export const updateGoalService = async ({goalId, goal_quantity}: {
  goalId: string,
  goal_quantity: bigint
}) => {
  return await axios.put(getGoalURL(goalId), {
    quantity_goal: goal_quantity
  }).then(response => response.data);
}

export const addGoalService = async ({crypto_name, quantity_goal}: {
  crypto_name: string,
  quantity_goal: bigint
}) => {
  return await axios.post(GOALS_ENDPOINT, {
    crypto_name,
    quantity_goal
  }).then(response => response.data)
}

export const deleteGoalService = async ({goalId}: {
  goalId: string
}) => {
  const deleteGoalUrl = GOALS_ENDPOINT.concat(`/${goalId}`);
  return await axios.delete(deleteGoalUrl)
    .then(response => response);
}