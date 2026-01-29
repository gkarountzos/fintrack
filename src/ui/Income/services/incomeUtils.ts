import { TIncome } from "@/src/types/Income";

export const getCategoryTotal = (catValue: string, filteredData: TIncome[]) => {
  return filteredData
    .filter((item) => item.category === catValue)
    .reduce((sum, item) => sum + item.amount, 0);
};

export const getCategoryCount = (catValue: string, filteredData: TIncome[]) => {
  return filteredData.filter((item) => item.category === catValue).length;
};
