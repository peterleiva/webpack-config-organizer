import { cosmiconfig } from "cosmiconfig"
import { access } from "fs/promises"
import resolver from "./resolver"
import { NoPermission } from "../errors"

/**
 * @typedef {{environment}} resolver
 */

/**
 * Checks file for permission throwing NoPermission error if it doens't
 *
 * @throws {NoPermission}
 * @param {string} file
 */
async function checkAccess(file) {
	try {
		await access(file)
	} catch (error) {
		console.error(error)
		throw new NoPermission(file)
	}
}

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
		const config = resolver(result?.config)

		await Promise.all(
			Object.getOwnPropertyNames(config).map(option =>
				checkAccess(config[option])
			)
		)

		return config
	} catch (error) {
		if (error instanceof NoPermission) {
			throw error
		}

		const badFormation = Object.create(error)
		badFormation.messsage += `Configuration file with bad formation`

		throw badFormation
	}
}
