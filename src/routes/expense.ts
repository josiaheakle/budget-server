import Express from "express"
import { body, validationResult } from "express-validator"
import { Op } from "sequelize"
import { isUserLoggedIn } from "../middleware/isUserLoggedIn"
import { formatServerResponse, formatValidationErrors } from "../modules/util/ObjectFormatter"
import { ExpenseCategory, ExpenseCategoryServerOnlyProps } from "../models/m.ExpenseCategory"
import { removeServerAttributes } from "../modules/util/DataFilter"

const router = Express.Router()

router.post(
	"/category",
	isUserLoggedIn,
	body("name").notEmpty().withMessage("Required."),
	async (req: Express.Request, res: Express.Response, next: Function) => {
		console.log({ body: req.body })

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

		const existingCategory = await ExpenseCategory.findOne({
			where: {
				name: {
					[Op.eq]: name,
				},
			},
		})

		if (uuid) {
			// UPDATING category
		} else {
			// CREATING category
			if (existingCategory) {
				const errors = {
					name: ["Category already exists!"],
				}
				return res.json(formatServerResponse(false, errorMsg, undefined, errors))
			}

			const cateogory = await ExpenseCategory.create({ name, icon })
			console.log({ cateogory })
			return res.json(
				formatServerResponse(true, "Successfully created category!", {
					expenseCategory: removeServerAttributes<ExpenseCategory>(
						cateogory,
						ExpenseCategoryServerOnlyProps
					),
				})
			)
		}
	}
)

export { router as expenseRouter }
