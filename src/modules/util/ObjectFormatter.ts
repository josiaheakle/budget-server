import { RequestErrors, ServerResponse } from "../../../../shared/types/ServerResponse";

/**
 * Converts express validator errors object into Request Errors object.
 * ---
 * @param errors
 * @returns
 */
export const formatValidationErrors = (
	errors: Array<{
		location: string;
		msg: string;
		param: string;
	}>
): RequestErrors => {
	const returnErrors: RequestErrors = {};
	for (const e of errors) {
		if (returnErrors[e.param]) returnErrors[e.param].push(e.msg);
		else returnErrors[e.param] = [e.msg];
	}
	return returnErrors;
};

/**
 * Generates a standard server response
 * ---
 * @param isValid Boolean to indicate if request was valid
 * @param message Simple message for user to view
 * @param data Response data
 * @param errors Input errors
 * @returns
 */
export const formatServerResponse = (
	isValid: boolean,
	message: string,
	data?: any,
	errors?: RequestErrors
): ServerResponse => {
	const sRes: ServerResponse = {
		valid: isValid,
		msg: message,
	};
	if (data) sRes["data"] = data;
	if (errors) sRes["errors"] = errors;
	return sRes;
};
