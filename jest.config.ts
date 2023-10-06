import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "^.+\\.test\\.ts$",
  moduleFileExtensions: ["js", "ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "./dist",
    "<rootDir>/dist",
    "<rootDir>/node_modules",
  ],
};

export default config;
