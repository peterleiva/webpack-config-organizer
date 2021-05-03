import Error from "./base-error"

export default class NoPermissionError extends Error {
	constructor(file) {
		super(`Can't access the file: ${file}`)
	}
}
