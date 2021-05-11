import { cosmiconfig } from "cosmiconfig"
import resolver from "./resolver.js"

/**
 * @typedef {{environment}} resolver
 */
const CONFIG_MODULE = "webpack-config-organizer"

/**
 * Load cosmiconfig looking for paths where to resolve presets and envs.
 *
 * LoadConfig uses the defaults values in case it don't find any cosmiconfig
 * file according to its search rules or if the path provided is not resolvable
 *
 * @return {Promise<{environment: string, presets: string}>}
 */
export default async function loader() {
	const explorer = cosmiconfig(CONFIG_MODULE)

	try {
		const result = await explorer.search()

		return resolver(result?.config)
	} catch (error) {
		const badFormation = Object.create(error)
		badFormation.messsage += `Configuration file with bad formation`

		throw badFormation
	}
}
