jest.spyOn(process, "cwd").mockImplementation(() => "/FAKE_CWD")

const { default: loader } = jest.requireActual("../loader")

export default loader
