import { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/setupTests.ts'],
}

export default config
