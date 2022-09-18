import { DataTypes, Model } from "sequelize"

import sequelize from "../modules/Database"
import { ModelBase } from "./m.ModelBase"

class ExpenseCategory extends Model {}

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
