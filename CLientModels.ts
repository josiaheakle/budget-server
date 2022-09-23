export type ModelBase = {
	[index: string]: any
	uuid: string
}

export interface ExpenseCategory extends ModelBase {
	name: string
	icon: string
}

export interface Expense extends ModelBase {
	amount: number
	categoryId: string
}

export interface User extends ModelBase {
	firstName: string
	lastName: string
	email: string
}

export interface Budget extends ModelBase {}
