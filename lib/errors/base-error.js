export default class BaseError extends Error {
	constructor(message) {
		super(`Webpack build tools: ${message}`)
	}
}

Error.captureStackTrace(BaseError)
