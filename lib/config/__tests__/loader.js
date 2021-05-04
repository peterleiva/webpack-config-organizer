import { cosmiconfig } from "cosmiconfig"
import loader from "../loader"

jest.mock("cosmiconfig")
jest.mock("../loader")

describe("loader", () => {
	let search = jest.fn()

	beforeEach(() => {
		cosmiconfig.mockImplementation(() => ({ search }))
		jest.clearAllMocks()
	})

	describe("Load default configuration object", () => {
		it("no file", () => {
			search.mockReturnValue(Promise.resolve(null))
		})

		it("empty file", () => {
			search.mockReturnValue(Promise.resolve({}))
		})

		it("meanless configurations", () => {
			search.mockReturnValue(Promise.resolve({ anotherConfig: "config" }))
		})

		afterEach(async () => {
			await expect(loader()).resolves.toMatchInlineSnapshot(`
						Object {
						  "environment": "/FAKE_CWD/build-tools/env/webpack.",
						  "presets": "/FAKE_CWD/build-tools/presets/webpack.",
						}
					`)
		})
	})

	describe("Load configuration object", () => {
		let configuration
		let result

		beforeEach(() => {
			configuration = { base: "FAKE_BASE" }
			result = { config: configuration }
		})

		it("returns fully configured file", async () => {
			const prefix = "FAKE_ENV_PREFIX"
			configuration.environment = {
				prefix,
				path: "FAKE_ENV_PATH",
			}

			configuration.presets = {
				prefix,
				path: "FAKE_PRESETS_PATH",
			}

			search.mockReturnValue(result)
			await expect(loader()).resolves.toMatchInlineSnapshot(`
						Object {
						  "environment": "/FAKE_CWD/FAKE_BASE/FAKE_ENV_PATH/FAKE_ENV_PREFIX",
						  "presets": "/FAKE_CWD/FAKE_BASE/FAKE_PRESETS_PATH/FAKE_ENV_PREFIX",
						}
					`)
		})

		it("returns partial configured file", async () => {
			configuration.environment = {
				path: "FAKE_PATH",
			}

			search.mockReturnValue(result)
			await expect(loader()).resolves.toMatchInlineSnapshot(`
						Object {
						  "environment": "/FAKE_CWD/FAKE_BASE/FAKE_PATH/webpack.",
						  "presets": "/FAKE_CWD/FAKE_BASE/presets/webpack.",
						}
					`)
		})
	})

	it("throws badFormation when file cannot has parser errors", async () => {
		search.mockRejectedValue(new Error())
		expect(loader()).toReject()
	})
})
