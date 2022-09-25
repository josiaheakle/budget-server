import sequelize from "../modules/Database"
import { User as ModelUser } from "./m.User"
import { Budget as ModelBudget } from "./m.Budget"
import { Expense as ModelExpense } from "./m.Expense"
import { ExpenseCategory as ModelExpenseCategory } from "./m.ExpenseCategory"

export const initModels = async () => {
	const opts = {
		force: true,
	}
	try {
		console.log("sequelize start")
		sequelize.sync(opts)
		console.log("INIT MODELS")
		await ModelUser.sync()
		console.log("user done, now budget")
		await ModelBudget.sync()
		console.log("budget done, now cat")
		await ModelExpenseCategory.sync()
		console.log("cat done, now expense")

		await ModelExpense.sync()
		console.log("expense done, now sequelize")
	} catch (e) {}
}
