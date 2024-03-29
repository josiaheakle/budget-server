import Express from "express"
import { body, validationResult } from "express-validator"
import { Op } from "sequelize"
import { isUserLoggedIn } from "../middleware/isUserLoggedIn"
import { formatServerResponse, formatValidationErrors } from "../modules/util/ObjectFormatter"
import { ExpenseCategory, ExpenseCategoryServerOnlyProps } from "../models/m.ExpenseCategory"
import { removeServerAttributes, updateModel } from "../modules/util/DataController"
import { Expense } from "../models/m.Expense"
import { logger } from "../modules/Logger"

const router = Express.Router()

router.get(
	"/",
	isUserLoggedIn,
	async (req: Express.Request, res: Express.Response, next: Function) => {
		try {
			const allExpenses = await Expense.scope("client").findAll({
				where: {
					userId: {
						[Op.eq]: res.locals.user.uuid,
					},
				},
			})
			return res.send(formatServerResponse(true, "Got expenses.", allExpenses))
		} catch (e) {
			logger.error("Error getting all expenses for user.", e)
			return res.send(formatServerResponse(false, "Could not get all expenses."))
		}
	}
)

router.get(
	"/:uuid",
	isUserLoggedIn,
	async (req: Express.Request, res: Express.Response, next: Function) => {
		const { uuid } = req.params
		const { user } = res.locals
		try {
			const expense = await Expense.scope("client").findOne({
				where: {
					uuid: {
						[Op.eq]: uuid,
					},
					userId: {
						[Op.eq]: user.uuid,
					},
				},
			})
			if (!expense) return res.send(formatServerResponse(false, "Could not get expense."))
			return res.send(formatServerResponse(true, "Got expense.", expense))
		} catch (e) {
			logger.error("Error getting one expenses for user.", e)
			return res.send(formatServerResponse(false, "Could not get expense."))
		}
	}
)

router.post(
	"/",
	isUserLoggedIn,
	async (req: Express.Request, res: Express.Response, next: Function) => {}
)

router.get(
	"/category",
	isUserLoggedIn,
	async (req: Express.Request, res: Express.Response, next: Function) => {
		try {
			const allCategories = await ExpenseCategory.findAll({
				where: {
					userId: {
						[Op.eq]: res.locals.user.uuid,
					},
				},
			})
			res.send(formatServerResponse(true, "Got categories.", allCategories))
		} catch (e) {
			console.error(e)
			res.send(formatServerResponse(false, "Unable to get categories."))
		}
	}
)

router.get(
	"/category/:uuid",
	isUserLoggedIn,
	async (req: Express.Request, res: Express.Response, next: Function) => {
		const { uuid } = req.params
		try {
			const cateogory = await ExpenseCategory.findOne({
				where: {
					uuid: {
						[Op.eq]: uuid,
					},
					userId: {
						[Op.eq]: res.locals.user.uuid,
					},
				},
			})
			return res.send(formatServerResponse(true, "Got category.", cateogory))
		} catch (e) {
			console.error(e)
			return res.send(formatServerResponse(false, "Unable to find category."))
		}
	}
)

router.post(
	"/category",
	isUserLoggedIn,
	body("name").notEmpty().withMessage("Required."),
	async (req: Express.Request, res: Express.Response, next: Function) => {
		const errorMsg = `Cannot create transaction category with this information, please try again. `
		const validationErrors = validationResult(req)

		if (!validationErrors.isEmpty()) {
			return res.json(
				formatServerResponse(
					false,
					errorMsg,
					undefined,
					formatValidationErrors(validationErrors["errors"])
				)
			)
		}

		const { name, icon, uuid } = req.body

		let existingCategory = await ExpenseCategory.findOne({
			where: {
				name: {
					[Op.eq]: name,
				},
				userId: {
					[Op.eq]: res.locals.user.uuid,
				},
			},
		})

		if (uuid) {
			if (existingCategory) {
				if (existingCategory?.getDataValue("uuid") !== uuid)
					return res.send(formatServerResponse(false, "Category with that name already exists."))
				else {
					existingCategory = await updateModel(existingCategory, req.body)
					return res.send(formatServerResponse(true, "Updated category.", existingCategory))
				}
			}
			existingCategory = await ExpenseCategory.findOne({
				where: {
					uuid: {
						[Op.eq]: uuid,
					},
					userId: {
						[Op.eq]: res.locals.user.uuid,
					},
				},
			})
			if (!existingCategory)
				return res.send(formatServerResponse(false, "Cannot find category to update."))
			existingCategory = await updateModel(existingCategory, req.body)
			return res.send(formatServerResponse(true, "Updated category.", existingCategory))
		} else {
			// CREATING category
			if (existingCategory) {
				const errors = {
					name: ["Category already exists!"],
				}
				return res.json(formatServerResponse(false, errorMsg, undefined, errors))
			}

			const cateogory = await ExpenseCategory.create({ name, icon, userId: res.locals.user.uuid })

			return res.json(
				formatServerResponse(
					true,
					"Successfully created category!",
					removeServerAttributes(cateogory, ExpenseCategoryServerOnlyProps)
				)
			)
		}
	}
)

export { router as expenseRouter }
