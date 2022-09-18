import Express from "express"

import cors from "cors"

import { initModels } from "./models/InitModels"
import { router as allRoutes } from "./routes/allRoutes"
import { logger, useLogger } from "./modules/Logger"

const app = Express()

const PORT = process.env.PORT ?? 5555

const startApp = async () => {
	await initModels()
	app.use((req: Express.Request, res: Express.Response, next: Function) => {
		next()
	})
	app.use(Express.json())
	app.use(cors())
	app.use(allRoutes)
	app.use(useLogger)
	app.listen(PORT, () => {
		logger.info(`Server started on port ${PORT}.`)
		console.log("APP START")
	})
}

startApp()
