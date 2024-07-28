import axios from "axios";
import {CRYPTO_BALANCE_TRACKER_URL} from "../constants/Constants";
import {GoalRequest} from "../model/request/goal/GoalRequest";
import {GoalResponse} from "../model/response/goal/GoalResponse";
import {PageGoalResponse} from "../model/response/goal/PageGoalResponse";

const GOALS_ENDPOINT = CRYPTO_BALANCE_TRACKER_URL.concat("/goals");

const getGoalURL = (goalId: string) => {
  return `${GOALS_ENDPOINT}/${goalId}`;
}

export const retrieveGoal = async (goalId: string): Promise<GoalResponse> => {
  const goalURL = getGoalURL(goalId);

  return await axios.get(goalURL)
    .then(response => response.data);
}

export const getGoalsByPageService = async (page: number): Promise<PageGoalResponse> => {
  const pageGoalsEndpoint = `${GOALS_ENDPOINT}?page=${page}`;

  return await axios.get(pageGoalsEndpoint)
    .then(response => response.data);
}

export const saveGoal = async (goalRequest: GoalRequest): Promise<GoalResponse> => {
  return await axios.post(GOALS_ENDPOINT, goalRequest)
    .then(response => response.data);
}

export const updateGoal = async (goalId: string, goalRequest: GoalRequest): Promise<GoalResponse> => {
  return await axios.put(getGoalURL(goalId), goalRequest)
    .then(response => response.data);
}

export const deleteGoalService = async ({goalId}: {
  goalId: string
}) => {
  const deleteGoalUrl = GOALS_ENDPOINT.concat(`/${goalId}`);

  return await axios.delete(deleteGoalUrl);
}