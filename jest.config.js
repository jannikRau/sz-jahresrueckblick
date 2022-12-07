// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'js'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },

  testPathIgnorePatterns: ['dist/.*/.*.js', '.*/node_modules/.*'],

  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/node_modules/**'],

  setupFilesAfterEnv: ['jest-extended/all'],
};
