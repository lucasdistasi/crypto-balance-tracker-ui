import {GoalResponse} from "./GoalResponse";

export interface PageGoalResponse {
  goals: Array<GoalResponse>,
  has_next_page: boolean,
  page: number,
  total_pages: number
}