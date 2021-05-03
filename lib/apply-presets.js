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
 * TODO: explain brefielly the env options from webpack 5
 * @param {import('webpack').Configuration & Presets} env
 * @return {import('webpack').Configuration}
 */
export default async function (env) {
	const presets = env.presets || env.preset || {}
	const mergedPresets = Object.keys(presets)

	const presetsConfig = mergedPresets.map(async name => {
		const presetFile = config.loader.presets + name

		try {
			return await loader(env, presetFile)
		} catch {
			const error = new PresetNotFound(presetFile)
			console.error(error)
		}
	})
	return merge({}, ...presetsConfig)
}
