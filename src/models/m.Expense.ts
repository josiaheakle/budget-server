import { DataTypes, Model } from "sequelize";
import sequelize from "../modules/Database";

import { ExpenseCategory } from "./m.ExpenseCategory";
import { Budget } from "./m.Budget";
import { ModelBase } from "./m.ModelBase";

class Expense extends Model {}

Expense.init(
	{
		...ModelBase,
		amount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		categoryId: {
			type: DataTypes.STRING,
			references: "expenseCategory",
			key: "id",
		},
	},
	{
		sequelize,
		modelName: "expense",
	}
);

// Expense.belongsTo(Budget);
// Expense.hasOne(ExpenseCategory);

export { Expense };
