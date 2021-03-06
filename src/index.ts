import Express from "express";

import { initModels } from "./models/InitModels";
import { router as allRoutes } from "./routes/allRoutes";
import { logger, useLogger } from "./modules/Logger";

const app = Express();

const PORT = process.env.PORT ?? 5000;

const startApp = async () => {
	await initModels();
	app.use(allRoutes);
	app.use(useLogger);
	app.listen(PORT, () => logger.info(`Server started on port ${PORT}.`));
};

startApp();
