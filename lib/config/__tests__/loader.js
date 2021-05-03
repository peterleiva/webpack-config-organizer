import loader from "../loader"
// const { access } = require("fs/promises")
// jest.mock("fs/promises")

describe("loader", () => {
	describe("no cosmiconfig module", () => {
		it.skip("returns default config file when has permission", async () => {
			await expect(loader()).resolves.toMatchInlineSnapshot(`
						Object {
						  "base": "build-tools",
						  "environment": Object {
						    "path": "env",
						    "prefix": "webpack",
						  },
						  "presets": Object {
						    "path": "presets",
						    "prefix": "webpack",
						  },
						}
					`)

			// expect(access).toHaveBeenCalledTimes(2)
			// expect(access).toHaveReturnedTimes(2)
		})
	})

	it.todo("returns config with modified merged")
	it.todo("throws NoPermission when base path doesn't exists")
	it.todo("throws NoPermission when presets path doesn't exists")
	it.todo("throws NoPermission when environment path doesnt exists")
	it.todo("throws badFormation when file cannot has parser errors")
})
