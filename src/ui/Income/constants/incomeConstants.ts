import localization from "@/src/lib/localization.json";

export const categories = [
  {
    name: localization.income.categories.salary,
    value: "salary",
    icon: "💼",
  },
  {
    name: localization.income.categories.freelance,
    value: "freelance",
    icon: "💻",
  },
  {
    name: localization.income.categories.investment,
    value: "investment",
    icon: "📈",
  },
  {
    name: localization.income.categories.business,
    value: "business",
    icon: "🏢",
  },
  {
    name: localization.income.categories.rental,
    value: "rental",
    icon: "🏠",
  },
  { name: localization.income.categories.gift, value: "gift", icon: "🎁" },
  { name: localization.income.categories.other, value: "other", icon: "💰" },
];

export const incomeTimePeriods = {
  THIS_MONTH: "thisMonth",
  LAST_MONTH: "lastMonth",
  THIS_YEAR: "thisYear",
};

export const incomeTimePeriodMap: Record<string, string> = {
  [incomeTimePeriods.THIS_MONTH]: localization.income.thisMonth,
  [incomeTimePeriods.LAST_MONTH]: localization.income.lastMonth,
  [incomeTimePeriods.THIS_YEAR]: localization.income.thisYear,
};
