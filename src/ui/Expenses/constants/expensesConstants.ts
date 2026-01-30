import localization from "@/src/lib/localization.json";

export const expensesCategories = [
  {
    name: localization.expenses.categoryLabels.food,
    value: "food",
    color: "bg-blue-500",
  },
  {
    name: localization.expenses.categoryLabels.transport,
    value: "transport",
    color: "bg-green-500",
  },
  {
    name: localization.expenses.categoryLabels.shopping,
    value: "shopping",
    color: "bg-purple-500",
  },
  {
    name: localization.expenses.categoryLabels.entertainment,
    value: "entertainment",
    color: "bg-pink-500",
  },
  {
    name: localization.expenses.categoryLabels.health,
    value: "health",
    color: "bg-red-500",
  },
  {
    name: localization.expenses.categoryLabels.bills,
    value: "bills",
    color: "bg-yellow-500",
  },
  {
    name: localization.expenses.categoryLabels.groceries,
    value: "groceries",
    color: "bg-cyan-500",
  },
  {
    name: localization.expenses.categoryLabels.other,
    value: "other",
    color: "bg-gray-500",
  },
];
