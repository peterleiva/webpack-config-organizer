import Error from "./base-error.js"

export default class ConfigNotFound extends Error {
	constructor(path) {
		super(`Webpack configuration ${path} not found`)
	}
}
