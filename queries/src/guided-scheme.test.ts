import { parseTestCase } from "./parse-testcase";
import { Suite } from "./specification";

const { title, botId, testCases } = Suite;

describe(title, () => {
  testCases.forEach((testCase) => {
    parseTestCase(testCase, botId);
  });
});
