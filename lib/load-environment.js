import config from "./config"
import loader from "./loader"

/**
 * Lazy load webpack env configuration, whether production or development
 * TODO: make it generic and use it as a base loader for webpack config
 *
 * @throws {import('./errors').ConfigNotFound}
 * @param {import('webpack').Configuration} env webpack environment
 * @return {Promise<import('webpack').Configuration>}
 */
export default async function (env) {
	const path =
		(await config.loader()).environment + `${env.mode || "production"}`

	return loader(env, path)
}
