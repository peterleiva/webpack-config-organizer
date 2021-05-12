import organizer from "../organizer"
import loadEnvironment from "../load-environment.js"
import applyPresets from "../apply-presets.js"

jest.mock("../load-environment.js")
jest.mock("../apply-presets.js")

function sharedConfig(text, env, config, presets) {
	const callOrganizer = (overrides = config) => {
		return presets ? organizer(presets, overrides) : organizer(overrides)
	}

	describe("shared returned configuration " + text, () => {
		test("returns configuration function", () => {
			expect(callOrganizer()).toBeFunction()
		})

		describe("Called by returned configuration function", () => {
			let configFunction

			beforeEach(async () => {
				configFunction = callOrganizer()
				await configFunction(env)
			})

			test("loadEnvironment is called with env object", () => {
				expect(loadEnvironment).toHaveBeenCalledWith(env)
			})

			test("applyPresets is called with env object", () => {
				expect(applyPresets).toHaveBeenNthCalledWith(2, env)
			})

			test(`applyPresets is called with ${
				presets ?? "empty"
			} presets`, async () => {
				const expectedPresets = {}
				presets?.reduce(
					(preset, presets) => Object.assign(presets, { [preset]: true }),
					expectedPresets
				)

				expect(applyPresets).toHaveBeenNthCalledWith(1, {
					presets: expectedPresets,
				})
			})
		})

		describe("when argument is a config function", () => {
			test("config function is called by returned function", async () => {
				const configFunction = jest.fn(() => config)

				await expect(callOrganizer(configFunction)(env)).resolves.toStrictEqual(
					config
				)

				expect(configFunction).toHaveBeenCalledWith(env)
				expect(configFunction).toHaveBeenCalledTimes(1)
			})
		})

		describe("when argument is a config object", () => {
			test("returns the exact config object by retuned function", async () => {
				await expect(callOrganizer()(env)).resolves.toStrictEqual(config)
			})
		})
	})
}

describe("organizer", () => {
	const config = {
		env: "development",
		entry: "fake_entry",
	}

	const env = {
		mode: "production",
	}

	beforeEach(() => {
		loadEnvironment.mockReturnValue({})
		applyPresets.mockReturnValue({})
	})

	sharedConfig("with object as an argument", env, config)
	sharedConfig("with presets as an argument", env, config, [
		"typescript",
		"babel",
	])

	describe("throws exception when", () => {
		test("loadEnvironment fails", () => {
			loadEnvironment.mockRejectedValue("fail")
		})

		test("applyPresets fails", () => {
			applyPresets.mockRejectedValue("fail")
		})

		afterEach(() => {
			expect(organizer(config)(env)).toReject()
		})
	})
})
