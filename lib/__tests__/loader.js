import loader from "../loader"
import { resolve } from "path"
import { ConfigNotFound } from "../errors"

describe("loader", () => {
	it("returns configuration file", () => {
		expect(loader({}, resolve("./lib/__mocks__/config-file")))
			.toMatchInlineSnapshot(`
					Object {
					  "default": Object {
					    "mode": "FAKE_ENV",
					  },
					}
				`)
	})

	it("returns configuration file if imported is a function", () => {
		expect(loader({}, resolve("./lib/__mocks__/config-file-function")))
			.toMatchInlineSnapshot(`
					Object {
					  "default": [Function],
					}
				`)
	})

	it("receives env as a argument to function", () => {
		const env = { a: "FAKE_A", b: "FAKE_B" }
		const { default: config } = loader(
			env,
			resolve("./lib/__mocks__/config-file-function")
		)

		expect(config(env)).toMatchObject({ env })
	})

	it("throws ConfigNotFound when path isn't found", () => {
		expect(() => loader({}, "/FAKE_PATH")).toThrow(ConfigNotFound)
	})
})
