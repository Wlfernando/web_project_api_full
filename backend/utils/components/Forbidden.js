module.exports = class Forbidden extends Error {
  statusCode = 403
  name = "Forbidden"

  constructor(message) {
    super(message)
  }
}