import { DataTypes, Model } from "sequelize"
import sequelize from "../modules/Database"

import { User } from "./m.User"
import { clientScope, ModelBase } from "./m.ModelBase"

class Budget extends Model {}

Budget.init(
	{
		...ModelBase,
		type: {
			type: DataTypes.ENUM,
			values: ["actual", "projected"],
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
		modelName: "budget",
		scopes: {
			client: clientScope,
		},
	}
)

Budget.belongsTo(User)

export { Budget }
