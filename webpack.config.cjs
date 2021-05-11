const path = require("path")
const nodeExternals = require("webpack-node-externals")

/**
 * @return {import('webpack').Configuration}
 */
module.exports = env => {
	const { mode } = env

	return {
		mode,

		target: "node",
		externalsPresets: { node: true },
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
