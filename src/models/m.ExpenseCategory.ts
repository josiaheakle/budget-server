import { DataTypes, Model } from "sequelize";

import sequelize from "../modules/Database";

import { Expense } from "./m.Expense";
import { ModelBase } from "./m.ModelBase";

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
);

// ExpenseCategory.hasMany(Expense);

export { ExpenseCategory };
