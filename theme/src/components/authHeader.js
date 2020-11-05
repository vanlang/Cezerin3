import jwt from "jsonwebtoken"

const cert = process.env.CONFIG_SERVER_JWT_KEY

class AuthHeader {
  constructor() {}
  encodeUserPassword(token) {
    return jwt.sign({ password: token }, cert)
  }
}

export default new AuthHeader()
