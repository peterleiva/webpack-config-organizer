const CWD = "/FAKE_CWD"

jest.spyOn(process, "cwd").mockImplementation(() => CWD)
const { default: resolver } = jest.requireActual("../resolver.js")

resolver._CWD = CWD

export default resolver
