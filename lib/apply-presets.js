import { merge } from "webpack-merge"
import config from "./config"
import { PresetNotFound } from "./errors"
import loader from "./loader"

/**
 * @typedef {{[name: string]: boolean}} PresetOptions
 */
/**
 * @typedef {{presets: PresetOptions} & {preset: PresetOptions}} Presets
 */

/**
 * Dynamically loads webpack configuration presets
 *
 * Use webpack 5 environment option to load configuration presets. Presets can
 * be use to define encapsulated behavior for building your app. A preset can
 * represent some particular functionaly for rapid test stuffs or just because
 * it got too big and you wish make it more managable.
 * Each preset received the webpack environment variable set in webpack CLI. So,
 * they can define other environment options
 *
 * @example <caption>Loading several presets</caption>
 * 	webpack --env presets.typescript presets.babel presets.analyzer
 *
 * @example <caption>Presets can be loaded by --env presets or --env preset</caption>
 * 	webpack --env presets.typescript preset.typescript
 *
 * @param {import('webpack').Configuration & Presets} [env = {}]
 * @return {import('webpack').Configuration}
 */
export default function (env = {}) {
	const presets = Object.keys(env?.presets ?? env?.preset ?? {})

	const configObjects = presets.map(async name => {
		const presetFile = config.loader.presets + name

		try {
			return await loader(env, presetFile)
		} catch {
			console.error(new PresetNotFound(presetFile))
		}
	})

	return merge({}, ...configObjects)
}
