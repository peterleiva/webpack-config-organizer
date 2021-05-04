import { cosmiconfig } from "cosmiconfig"
import resolver from "./resolver"
import { NoPermission } from "../errors"

/**
 * @typedef {{environment}} resolver
 */

/**
 * Load cosmiconfig looking for paths where to resolve presets and envs.
 *
 * LoadConfig uses the defaults values in case it don't find any cosmiconfig
 * file according to its search rules or if the path provided is not resolvable
 *
 * @return {Promise<{environment: string, presets: string}>}
 */
export default async function loader() {
	const explorer = cosmiconfig("webpack-build-tools")

	try {
		const result = await explorer.search()

		return resolver(result?.config)
	} catch (error) {
		if (error instanceof NoPermission) {
			throw error
		}

		const badFormation = Object.create(error)
		badFormation.messsage += `Configuration file with bad formation`

		throw badFormation
	}
}
