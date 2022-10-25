class ConfigError extends Error {
  constructor(name: string, message?: string) {
    super(message ?? 'Missing Environment Variable')
    Object.setPrototypeOf(this, ConfigError.prototype)
    this.name = name
    Error.captureStackTrace(this)
  }
}

const requiredEnvVariable = (name: string) => {
  const throwError = () => {
    throw new ConfigError(name)
  }
  return process.env[name] ?? throwError()
}

const config = {
  crypto: {
    saltRounds: Number(process.env.SALT_ROUNDS ?? 10),
  },
  http: {
    hostname: process.env.HOSTNAME ?? 'localhost',
    port: Number(process.env.PORT ?? 3000),
  },
  session: {
    getSecret: () => requiredEnvVariable('SESSION_SECRET'),
  },
  environment: process.env.NODE_ENV ?? 'production',
}

export default config
