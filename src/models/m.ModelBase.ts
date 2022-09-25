import { DataTypes, Sequelize } from "sequelize"
import { generateUUID } from "../modules/util/uuidGenerator"

export const serverOnlyAttributes = ["id", "createdAt", "updatedAt"]

export const clientScope = {
	attributes: {
		exclude: serverOnlyAttributes,
	},
}

export const ModelBase = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	uuid: {
		type: DataTypes.UUID,
		unique: true,
		defaultValue: () => generateUUID(),
	},
}
