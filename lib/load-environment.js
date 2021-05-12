import * as config from "./config/index.js"
import loader from "./loader.js"

/**
 * Lazy load webpack env configuration, whether production or development
 *
 * @throws {import('./errors').ConfigNotFound}
 * @param {import('webpack').Configuration} env webpack environment
 * @return {Promise<import('webpack').Configuration>}
 */
export default async function (env) {
	const path =
		(await config.loader()).environment + `${env?.mode ?? "production"}`

	return loader(env, path)
}
