import Error from "./base-error"

export default class ConfigNotFound extends Error {
	constructor(path) {
		super(`Webpack configuration ${path} not found`)
	}
}
