/**
 * This is how all invalid requests will be handled
 * ---
 * index: name of invalid input
 * value: array of error messages
 */
export interface RequestErrors {
	[index: string]: Array<string>
}

type Data = { [index: string]: any }

interface ServerResponseValid {
	isValid: true
	message: string
	data: Data | Array<Data>
}

interface ServerResponseInvalid {
	isValid: false
	message: string
	data?: Data | Array<Data>
	errors?: RequestErrors
}

/**
 * This is how the server will respond to all requests.
 * ---
 * While it may be better practice to leverage the http status codes, I am using a simple valid boolean in the response.
 */
export type ServerResponse = ServerResponseValid | ServerResponseInvalid
