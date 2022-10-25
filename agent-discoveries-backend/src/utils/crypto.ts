import bcrypt from 'bcrypt'
import config from '../config'

export const hashPassword = (password: string) =>
  bcrypt
    .genSalt(config.crypto.saltRounds)
    .then((salt) => bcrypt.hash(password, salt))

export const doPasswordsMatch = (
  plaintextPassword: string | Buffer,
  hashedPassword: string,
) => bcrypt.compare(plaintextPassword, hashedPassword).catch(() => false)
