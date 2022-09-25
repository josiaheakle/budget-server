import { DataTypes, Model } from "sequelize"

import sequelize from "../modules/Database"
import { ModelBase } from "./m.ModelBase"
import { User } from "./m.User"

class ExpenseCategory extends Model {}

export const ExpenseCategoryServerOnlyProps = ["id", "createdAt", "updatedAt"]
export const ExpenseCategoryClientOnlyProps = ["name", "uuid"]

ExpenseCategory.init(
	{
		...ModelBase,
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.UUID,
			references: {
				model: User,
				key: "uuid",
			},
		},
	},
	{
		sequelize,
		modelName: "expenseCategory",
	}
)

export { ExpenseCategory }
