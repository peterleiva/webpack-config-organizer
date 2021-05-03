import resolver from "../resolver.js"
jest.mock("../resolver.js")

const options = ["environment", "presets"]

describe("config object is undefined", () => {
	it("return default %s value", () => {
		expect(resolver()).toMatchInlineSnapshot(`
		Object {
		  "environment": "${resolver._CWD}/build-tools/env/webpack.",
		  "presets": "${resolver._CWD}/build-tools/presets/webpack.",
		}
	`)
	})
})

describe("config is override", () => {
	const base = "FAKE_BASE_PATH"
	const path = "FAKE_PATH"

	it("returns with non-valid options", () => {
		const config = resolver({
			gibbirish: "1",
			another: {
				doh: 1,
			},
		})

		expect(config).toMatchInlineSnapshot(`
		Object {
		  "environment": "${resolver._CWD}/build-tools/env/webpack.",
		  "presets": "${resolver._CWD}/build-tools/presets/webpack.",
		}
	`)
	})

	it.each(options)("returns fully modified %s", option => {
		const config = resolver({
			base,
			[option]: { path, prefix: "FAKE_PREFIX" },
		})

		expect(config[option]).toMatchInlineSnapshot(
			`"${resolver._CWD}/FAKE_BASE_PATH/FAKE_PATH/FAKE_PREFIX"`
		)
	})

	it.each(options)("returns partial config for %s", option => {
		const config = resolver({
			[option]: { path },
		})

		expect(config[option]).toBe(
			`${resolver._CWD}/build-tools/FAKE_PATH/webpack.`
		)
	})
})
