import {GoalResponse} from "./GoalResponse";

export interface PageGoalResponse {
  page: number,
  totalPages: number,
  hasNextPage: boolean,
  goals: Array<GoalResponse>
}