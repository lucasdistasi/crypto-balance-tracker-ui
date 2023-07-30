import {GoalResponse} from "./GoalResponse";

export interface PageGoalResponse {
  goals: Array<GoalResponse>,
  hasNextPage: boolean,
  page: number,
  totalPages: number
}