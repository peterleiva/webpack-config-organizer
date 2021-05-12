import loadEnvironment from "../load-environment"
import loader from "../loader"

const environment = "/fake_env_path/"
jest.mock("../loader")
jest.mock("../config/loader", () => {
	return () => ({
		environment,
	})
})

describe("load-environment", () => {
	const env = {
		entry: "fake_entry",
	}
	beforeEach(jest.clearAllMocks)

	it("loads production with empty mode", async () => {
		await loadEnvironment(env)
		expect(loader.mock.calls[0][1]).toMatch("production")
	})

	it("loads env mode", async () => {
		const mode = "test"
		await loadEnvironment({ ...env, mode })
		expect(loader.mock.calls[0][1]).toMatch(mode)
	})

	it("loader is called with env", async () => {
		await loadEnvironment(env)
		expect(loader).toHaveBeenCalledWith(env, environment + "production")
	})
})
