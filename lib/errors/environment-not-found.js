import Error from "./base-error"

export default class EnvironmentNotFound extends Error {
	constructor(file) {
		super(`Environment file ${file} not found`)
	}
}
