import { resolve } from "path"
import { cloneDeep, merge } from "lodash"

/**
 * Defaults object with webpack-build-tools configurations
 *
 * @typedef {{path: string, prefix: string}} FileConfig
 * @typedef {{base: string, presets: FileConfig, environment: FileConfig}} Config
 */
const DEFAULTS = Object.seal({
	base: "build-tools",

	presets: {
		path: "presets",
		prefix: "webpack.",
	},
	environment: {
		path: "env",
		prefix: "webpack.",
	},
})

const BASE_PATH = process.cwd()

/**
 * Get resolved path for env or presets options
 *
 * @param {Config} config
 * @return {{environment: string, presets: string}}
 */
export default function (config = DEFAULTS) {
	config = merge(cloneDeep(DEFAULTS), config)

	/**
	 * Resolve a config directory path using config object
	 *
	 * @param {string} option
	 * @returns
	 */
	function _resolver(option) {
		const {
			[option]: { path, prefix },
			base,
		} = config

		return resolve(BASE_PATH, base, path, prefix)
	}

	return {
		environment: _resolver("environment"),
		presets: _resolver("presets"),
	}
}
