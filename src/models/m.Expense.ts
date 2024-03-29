import { DataTypes, Model } from "sequelize"
import sequelize from "../modules/Database"

import { ExpenseCategory } from "./m.ExpenseCategory"
import { Budget } from "./m.Budget"
import { clientScope, ModelBase } from "./m.ModelBase"
import { User } from "./m.User"

class Expense extends Model {}

Expense.init(
	{
		...ModelBase,
		amount: {
			type: DataTypes.DECIMAL(8, 2),
			allowNull: false,
		},
		expenseDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		categoryId: {
			type: DataTypes.UUID,
			references: {
				model: ExpenseCategory,
				key: "uuid",
			},
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
		modelName: "expense",
		scopes: {
			client: clientScope,
		},
	}
)

// Expense.belongsTo(Budget);
// Expense.hasOne(ExpenseCategory);

export { Expense }
