/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
	collectCoverage: true,
	coverageDirectory: "coverage",
	coveragePathIgnorePatterns: ["/node_modules/", "/dist/", ".vscode", ".husky"],
	coverageProvider: "v8",
	coverageThreshold: {
		global: {
			lines: 90,
			statements: -10,
			branches: -20,
		},
	},

	testEnvironment: "node",

	setupFilesAfterEnv: ["jest-extended"],

	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
}
