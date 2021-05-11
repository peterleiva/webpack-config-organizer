/**
 * @type {import('@babel/core').ConfigFunction}
 */

module.exports = api => ({
	retainLines: true,
	sourceMaps: api.env("test") ? "inline" : false,
	presets: [["@babel/preset-env", { targets: { node: "current" } }]],
})
