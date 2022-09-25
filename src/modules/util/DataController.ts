import { Model } from "sequelize"
import { Data } from "../../../../shared/types/ServerResponse"

interface ModelType<T> extends Model {
	[index: string]: any
}

export function removeServerAttributes<T extends Model>(
	model: ModelType<T>,
	serverOnlyProps: Array<string>
) {
	const retModel = model
	for (const prop of serverOnlyProps) {
		delete retModel.dataValues[prop]
	}
	return retModel
}

export async function updateModel<T extends Model>(model: T, data: Data) {
	const retModel = model
	for (const [key, value] of Object.entries(data)) {
		// @ts-ignore
		if (retModel.dataValues.hasOwnProperty(key)) {
			retModel.setDataValue(key, value)
		}
	}
	await retModel.save()
	return retModel
}
