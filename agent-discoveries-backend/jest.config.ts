import { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/setupTests.ts'],
}

export default config
