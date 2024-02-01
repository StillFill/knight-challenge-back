module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: ["src/**/*.ts", "!<rootDir>/node_modules/"],
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
    },
  },
  coveragePathIgnorePatterns: [
    "src/index.ts",
    "src/db",
    "src/routes",
    "src/middlewares/GlobalErrorHandler.ts",
    "src/validators/exceptions",
  ],
};
