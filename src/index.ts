import Express from "express";
import { router as allRoutes } from "./routes/allRoutes";

const app = Express();

const PORT = process.env.PORT ?? 5000;

const initRoutes = () => {
  app.use(allRoutes);
};

const startApp = async () => {
  initRoutes();
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

startApp();
