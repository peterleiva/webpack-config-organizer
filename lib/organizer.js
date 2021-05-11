import { merge } from "webpack-merge"
import { applyPresets, loadEnvironment } from "./index.js"

/** @typedef {import('webpack').Configuration | Function} WebpackConfiguration */

/**
 * @param {WebpackConfiguration | string[]} presetsOrConfiguration
 * @param {WebpackConfiguration} [config] optional webpack configuration
 */
export default function (presetsOrConfiguration, config) {
	if (presetsOrConfiguration instanceof Array) {
		return configurator(presetsOrConfiguration, config)
	} else {
		return configurator([], presetsOrConfiguration)
	}
}

/**
 *
 * @param {string[] | WebpackConfiguration | Function} [defaultPresets = []] defaults presets to be applied to
 * @param  {import('webpack').Configuration} [webpackConfig]
 * @returns
 */
function configurator(defaultPresets = [], webpackConfig = {}) {
	const presets = {}

	defaultPresets.reduce(
		(presets, preset) => Object.assign(presets, { [preset]: true }),
		presets
	)

	return async env => {
		const configs = [
			await loadEnvironment(env),
			await applyPresets({ presets }),
			await applyPresets(env),
		]

		return merge(
			...configs,
			typeof webpackConfig === "function" ? webpackConfig(env) : webpackConfig
		)
	}
}
