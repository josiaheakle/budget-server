import { User as ModelUser } from "./m.User";
import { Budget as ModelBudget } from "./m.Budget";
import { Expense as ModelExpense } from "./m.Expense";
import { ExpenseCategory as ModelExpenseCategory } from "./m.ExpenseCategory";

export const initModels = async () => {
	await ModelUser.sync();
	await ModelBudget.sync();
	await ModelExpenseCategory.sync();
	await ModelExpense.sync();
};
