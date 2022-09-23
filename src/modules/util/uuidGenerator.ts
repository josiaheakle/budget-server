import { v4 as uuid } from "uuid"

/**
 * Leverages uuidv4 to create a unique identifier,
 * returning a string of only letters and numbers of the length specified
 * @param length The length of the unique identified
 * @returns
 */
export function generateUUID(length?: number): string {
	const uuidStr = (uuid() as string).replaceAll("-", "").slice(0, length || 16)
	console.log(uuidStr)
	return uuidStr
}
