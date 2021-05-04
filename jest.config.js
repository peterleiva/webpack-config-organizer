/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
	collectCoverage: true,
	coverageDirectory: "coverage",
	coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
	coverageProvider: "v8",

	testEnvironment: "node",

	setupFilesAfterEnv: ["jest-extended"],

	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
}
