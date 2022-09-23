import { DataTypes, Model } from "sequelize"

import sequelize from "../modules/Database"
import { ModelBase } from "./m.ModelBase"

class ExpenseCategory extends Model {}

export const ExpenseCategoryServerOnlyProps = ["id", "createdAt", "updatedAt"]

ExpenseCategory.init(
	{
		...ModelBase,
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "expenseCategory",
	}
)

export { ExpenseCategory }
