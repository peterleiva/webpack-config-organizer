import loader from "../loader"
import { resolve } from "path"
import { ConfigNotFound } from "../errors"

describe("loader", () => {
	it("returns configuration file", async () => {
		await expect(loader({}, resolve("./lib/__mocks__/config-file"))).resolves
			.toMatchInlineSnapshot(`
					Object {
					  "default": Object {
					    "mode": "FAKE_ENV",
					  },
					}
				`)
	})

	it("returns configuration file if imported is a function", async () => {
		await expect(loader({}, resolve("./lib/__mocks__/config-file-function")))
			.resolves.toMatchInlineSnapshot(`
					Object {
					  "default": [Function],
					}
				`)
	})

	it("receives env as a argument to function", async () => {
		const env = { a: "FAKE_A", b: "FAKE_B" }
		const { default: config } = await loader(
			env,
			resolve("./lib/__mocks__/config-file-function")
		)

		expect(config(env)).toMatchObject({ env })
	})

	it("throws ConfigNotFound when path isn't found", async () => {
		await expect(loader({}, "/FAKE_PATH")).rejects.toThrow(ConfigNotFound)
	})
})
