/* eslint-disable node/no-unsupported-features/es-syntax */
import applyPresets from "../apply-presets"
import ConfigNotFound from "../errors/config-not-found"

/**
 *
 * @param {undefined | object} env
 * @param {object[]} presets
 */
function setupLoader() {
	const loader = jest.fn()

	jest.doMock("../loader", () => ({
		__esModule: true,
		default: loader,
	}))

	return loader
}

function setupConfig(config = {}) {
	const defaults = {
		mode: "FAKE_ENV",
		input: "FAKE_INPUT",
	}

	return Object.assign(defaults, config)
}

const properties = ["preset", "presets"]

describe("apply-preset", () => {
	beforeEach(jest.resetModules)

	describe("Get empty object when", () => {
		it("called with undefined", async () => {
			await expect(applyPresets()).resolves.toBeEmpty()
		})

		it("called without preset and presets properties", async () => {
			await expect(applyPresets({})).resolves.toBeEmpty()
		})

		it("called with empty preset and presets properties", async () => {
			const env = {
				preset: {},
				presets: {},
			}

			await expect(applyPresets(env)).resolves.toBeEmpty()
		})
	})

	describe("Get single config object when", () => {
		it.each(properties)("called with a %s object", async property => {
			const config = setupConfig()

			const loader = await setupLoader()
			loader.mockReturnValue(config)

			const { default: applyPresets } = await import("../apply-presets")
			const presets = await applyPresets({
				[property]: {
					fakePreset: true,
				},
			})

			expect(loader).toHaveReturnedTimes(1)
			expect(presets).toStrictEqual(config)
		})
	})

	describe("Get multiple config object when", () => {
		const tsConfig = setupConfig({ typescript: "config" })
		const analyzerConfig = setupConfig({ analyzer: "config" })

		it.each(properties)("called with multiple %s objects", async property => {
			const env = {
				[property]: {
					typescript: true,
					analyzer: true,
				},
			}

			const loader = setupLoader()
			loader.mockReturnValueOnce(tsConfig).mockReturnValueOnce(analyzerConfig)

			const { default: applyPresets } = await import("../apply-presets")
			const presets = await applyPresets(env)

			expect(loader).toHaveBeenCalledTimes(2)

			expect(presets).toMatchObject(tsConfig)
			expect(presets).toMatchObject(analyzerConfig)
		})

		it("called with mixed preset and presets objects", async () => {
			const loader = setupLoader()
			loader.mockReturnValueOnce(tsConfig).mockReturnValueOnce(analyzerConfig)

			const { default: applyPresets } = await import("../apply-presets")
			const presets = await applyPresets({
				preset: {
					typescript: true,
				},
				presets: {
					analyzer: true,
				},
			})

			expect(loader).toHaveBeenCalledTimes(2)

			expect(presets).toMatchObject(tsConfig)
			expect(presets).toMatchObject(analyzerConfig)
		})
	})

	it.each(properties)(
		"overrides with %s configuration object",
		async property => {
			const tsConfig = {
				entry: "ts-config",
				output: "A",
			}

			const analyzerConfig = {
				entry: "analyzer-config",
				output: "B",
			}

			const loader = setupLoader()
			loader.mockReturnValueOnce(tsConfig).mockReturnValueOnce(analyzerConfig)

			const { default: applyPresets } = await import("../apply-presets")
			const presets = await applyPresets({
				[property]: {
					typescript: true,
					analyzer: true,
				},
			})

			expect(loader).toHaveBeenCalledTimes(2)
			expect(presets).toStrictEqual(tsConfig)
		}
	)

	it("merge configuration objects with the first occurrence", async () => {
		const tsConfig = {
			entry: "FAKE_ENTRY",
		}

		const analyzerConfig = {
			output: "FAKE_OUTPUT",
		}

		const loader = setupLoader()
		loader.mockReturnValueOnce(tsConfig).mockReturnValueOnce(analyzerConfig)

		const { default: applyPresets } = await import("../apply-presets")
		const presets = await applyPresets({
			presets: { typescript: true, analyzer: true },
		})

		expect(loader).toHaveBeenCalledTimes(2)
		expect(presets).toStrictEqual(Object.assign(tsConfig, analyzerConfig))
	})

	it("ignore loader errors", async () => {
		const configA = {
			entry: "FAKE_ENTRY",
		}
		const configB = {
			output: "FAKE_OUTPUT",
		}
		const loader = setupLoader()

		jest.spyOn(console, "error").mockImplementationOnce(() => {})

		loader
			.mockReturnValueOnce(configA)
			.mockRejectedValueOnce(new ConfigNotFound())
			.mockReturnValueOnce(configB)

		const { default: applyPresets } = await import("../apply-presets")
		const presets = await applyPresets({
			presets: {
				configA: true,
				configError: true,
				configB: true,
			},
		})

		expect(loader).toHaveBeenCalledTimes(3)
		expect(console.error).toHaveBeenCalledTimes(1)

		expect(presets).toStrictEqual({
			entry: "FAKE_ENTRY",
			output: "FAKE_OUTPUT",
		})
	})
})
