import { Model } from "sequelize"

interface ModelType<T> extends Model {
	[index: string]: any
}

export function removeServerAttributes<T extends Model>(
	model: ModelType<T>,
	serverOnlyProps: Array<string>
) {
	for (const prop in serverOnlyProps) {
		console.log("removeing", prop)
		delete model[prop]
	}
	return model
}
