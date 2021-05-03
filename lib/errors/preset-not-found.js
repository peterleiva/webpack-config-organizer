import Error from "./base-error"

export default class PresetNotFound extends Error {
	/**
	 *
	 * @param {string} file path to preset searched
	 */
	constructor(file) {
		super(`Webpack preset ${file} not found`)
	}
}
