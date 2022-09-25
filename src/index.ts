import Express from "express"

import cors from "cors"

import { initModels } from "./models/InitModels"
import { router as allRoutes } from "./routes/allRoutes"
import { logger, useLogger } from "./modules/Logger"

const app = Express()

const PORT = process.env.PORT ?? 5555

const startApp = async () => {
	app.use(Express.json())
	await initModels()
	app.use((req: Express.Request, res: Express.Response, next: Function) => {
		const { body, path } = req
		console.log({ body, path })
		next()
	})
	app.use(cors())
	app.use(allRoutes)
	app.use(useLogger)
	app.listen(PORT, () => {
		logger.info(`Server started on port ${PORT}.`)
		console.log("APP START")
	})
}

startApp()
