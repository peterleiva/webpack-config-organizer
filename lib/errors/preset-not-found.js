import Error from "./base-error.js"

export default class PresetNotFound extends Error {
	/**
	 *
	 * @param {string} file path to preset searched
	 */
	constructor(file) {
		super(`Webpack preset ${file} not found`)
	}
}
