module.exports = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@libs/lodash': '<rootDir>/libs/lodash/src',
    '@libs/postgresql': '<rootDir>/libs/postgresql/src',
    'apps/(.*)': '<rootDir>/apps/$1',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/', '<rootDir>/migrations/'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
