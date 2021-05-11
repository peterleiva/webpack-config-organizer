import { merge } from "webpack-merge"
import * as config from "./config/index.js"
import { PresetNotFound } from "./errors/index.js"
import loader from "./loader.js"

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
 * they can define other environment options.
 * Presets are override if diferent preset have the same value, given preference
 * for the first occurence
 *
 * @example <caption>Loading several presets</caption>
 * 	webpack --env presets.typescript presets.babel presets.analyzer
 *
 * @example <caption>Presets can be loaded with presets or preset</caption>
 * 	webpack --env presets.typescript preset.typescript
 *
 * @param {import('webpack').Configuration & Presets} [env = {}]
 * @return {import('webpack').Configuration}
 */
export default async function (env = {}) {
	const presets = Object.keys(Object.assign({}, env?.presets, env?.preset))
	const path = (await config.loader()).presets

	const configObjects = presets.map(async name => {
		try {
			return await loader(env, path + name)
		} catch {
			console.error(new PresetNotFound(path))
			return {}
		}
	})

	const configs = await Promise.all(configObjects)
	return merge({}, ...configs.reverse())
}
