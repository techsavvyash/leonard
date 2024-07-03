module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/*.test.ts'  // Pattern to match test files
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};