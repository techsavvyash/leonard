module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/*.test.ts", // Pattern to match test files
  ],
  transform: {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
};
