import { DataTypes, Sequelize } from "sequelize"
import { generateUUID } from "../modules/util/uuidGenerator"

export const ModelBase = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	uuid: {
		type: DataTypes.UUID,
		defaultValue: () => generateUUID(),
	},
}
