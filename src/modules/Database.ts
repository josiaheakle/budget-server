import { Sequelize } from "sequelize"

require("dotenv").config()

export default new Sequelize(
	`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
	{ logging: true }
)
