import path, { dirname } from "path"
import { fileURLToPath } from "url"
import nodeExternals from "webpack-node-externals"

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @return {import('webpack').Configuration}
 */
export default env => {
	const { mode } = env

	return {
		mode,

		target: "node",
		externals: [nodeExternals()],
		resolve: {
			extensions: [".js", ".cjs", ".mjs"],
		},
		module: {
			rules: [
				{
					test: /\.[mc]js$/,
					use: "babel-loader",
					exclude: [/__tests?__/, /__mocks__/, /__snapshots__/],
				},
			],
		},
		context: path.resolve(__dirname, "lib"),
		entry: "./index.js",

		output: {
			filename: "[name].cjs",
			path: path.resolve(__dirname, "dist"),
			library: {
				type: "commonjs2",
			},
		},
	}
}
