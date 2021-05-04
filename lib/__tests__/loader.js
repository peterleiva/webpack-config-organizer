import loader from "../loader"
import { resolve } from "path"
import { ConfigNotFound } from "../errors"

describe("loader", () => {
	it("returns configuration file", async () => {
		await expect(loader({}, resolve("./lib/__mocks__/config-file"))).resolves
			.toMatchInlineSnapshot(`
					Object {
					  "mode": "FAKE_ENV",
					}
				`)
	})

	it("returns configuration file if imported is a function", async () => {
		await expect(loader({}, resolve("./lib/__mocks__/config-file-function")))
			.resolves.toMatchInlineSnapshot(`
					Object {
					  "env": Object {},
					  "mode": "FAKE_ENV",
					}
				`)
	})

	it("receives env as a argument to function", async () => {
		const env = { a: "FAKE_A", b: "FAKE_B" }

		await expect(
			loader(env, resolve("./lib/__mocks__/config-file-function"))
		).resolves.toMatchObject({ env })
	})

	it("throws ConfigNotFound when path isn't found", async () => {
		await expect(loader({}, "/FAKE_PATH")).rejects.toThrow(ConfigNotFound)
	})
})
