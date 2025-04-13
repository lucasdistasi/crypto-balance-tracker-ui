import {GoalResponse} from "../model/response/goal/GoalResponse";

export enum GoalsOrderBy {
  DEFAULT,
  SORT_BY_PROGRESS,
  SORT_BY_MONEY_NEEDED,
  SORT_BY_CRYPTO_NAME
}

export function sortGoals(lastOrderBy: GoalsOrderBy, goals: Array<GoalResponse>, sortAscending: boolean): GoalResponse[] {
  switch (lastOrderBy) {
    case GoalsOrderBy.SORT_BY_PROGRESS:
      return  sortAscending ?
        goals.toSorted((a, b) => a.progress - b.progress) :
        goals.toSorted((a, b) => b.progress - a.progress);

    case GoalsOrderBy.SORT_BY_CRYPTO_NAME:
      return goals.toSorted((a, b) => {
        if (a.cryptoInfo.cryptoName < b.cryptoInfo.cryptoName) {
          return sortAscending ? 1 : -1;
        }

        if (b.cryptoInfo.cryptoName < a.cryptoInfo.cryptoName) {
          return sortAscending ? -1 : 1;
        }

        return 0;
      });

    case GoalsOrderBy.SORT_BY_MONEY_NEEDED:
      return  sortAscending ?
        goals.toSorted((a, b) => Number(a.moneyNeeded) - Number(b.moneyNeeded)) :
        goals.toSorted((a, b) => Number(b.moneyNeeded) - Number(a.moneyNeeded));

    default:
      return goals;
  }
}