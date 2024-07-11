/**
 *
 * @description checks if the msg and expected are the exact same things or not.
 * @param msg
 * @param expected
 * @returns boolean
 */

export const text_validator = (msg: any, testCase: any): boolean => {
  const text = msg.payload.text.trim();
  const expected = testCase.response.text.trim();

  if (text === expected) return true;
  return false;
};
