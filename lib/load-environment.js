import { loader } from "./config"

/**
 * Lazy load webpack env configuration, whether production or development
 * TODO: make it generic and use it as a base loader for webpack config
 *
 * @throws "Webpack environment not load"
 * @param {import('webpack').Configuration} env webpack environment
 * @return {import('webpack').Configuration}
 */
export default async function (env) {
	const configPath = loader.environment + `webpack.${env.mode || "production"}`

	try {
		// check if it's a function
		// eslint-disable-next-line node/no-unsupported-features/es-syntax
		const envConfig = await import(configPath)

		return envConfig instanceof Function ? envConfig(env) : env
	} catch (error) {
		console.error(
			"Webpack environment not loaded: Webpack environment configuration " +
				`"${configPath}".ts doesn't exists`
		)
	}
}
