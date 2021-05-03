import { merge } from "webpack-merge"
import { loader } from "./config"
import { PresetNotFound } from "./errors"

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
		const presetFile = loader.presets + name

		try {
			// eslint-disable-next-line node/no-unsupported-features/es-syntax
			const preset = await import(presetFile)
			return typeof preset === "function" ? preset(env) : preset
		} catch (error) {
			throw new PresetNotFound(presetFile)
		}
	})
	return merge({}, ...presetsConfig)
}
