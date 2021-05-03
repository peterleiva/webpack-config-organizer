import ConfigNotFound from "./errors/environment-not-found"

/**
 * Dynamicaly load a webpack configuration file
 *
 * Use path to find a path to a configuration file with two formats, a function
 * which receives webpack env parameter or a configuration object. In case the
 * file doens't exists or there's some error importing the file a ConfigNotFound
 * it throwed specifying its location.
 *
 * @throws ConfigNotFound
 * @param {import('webpack').Configuration} env webpack environment
 * @return {Promise<import('webpack').Configuration>}
 */
export default async function (env, path) {
	try {
		// check if it's a function
		// eslint-disable-next-line node/no-unsupported-features/es-syntax
		const config = await import(path)
		return config instanceof Function ? config(env) : env
	} catch {
		throw new ConfigNotFound(path)
	}
}
