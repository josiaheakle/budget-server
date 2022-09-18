import * as Express from "express"
import winston from "winston"

export const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: `${process.env.LOG_DIR}/error.log`,
			level: "error",
		}),
		new winston.transports.File({
			filename: `${process.env.LOG_DIR}/combined.log`,
		}),
	],
})

export const useLogger = (req: Express.Request, res: Express.Response, next: Function) => {
	const { baseUrl, body, cookies, headers, method, params, url } = req
	try {
		logger.info(JSON.stringify({ baseUrl, body, cookies, headers, method, params, url }))
	} catch (err) {
		logger.error(err)
	}
}

/**
 * @param any anything
 */
export const log = (...any: any) => {
	try {
		logger.info(JSON.stringify(any))
	} catch (err) {
		logger.error(err)
	}
}

// if (process.env.NODE_ENV !== "production") {
// 	logger.add(
// 		new winston.transports.Console({
// 			format: winston.format.simple(),
// 		})
// 	);
// }
