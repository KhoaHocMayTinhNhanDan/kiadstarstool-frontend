// jest.config.js (ESM)
export default {
  moduleDirectories: ['node_modules', 'src'],

  moduleNameMapper: {
    '^uuid$': '<rootDir>/tests/mocks/uuid.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  testEnvironment: 'node',
  clearMocks: true,

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json'
      }
    ]
  },

  extensionsToTreatAsEsm: ['.ts']
};
