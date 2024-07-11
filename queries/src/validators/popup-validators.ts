/**
 *
 * @param msg
 * @param testCase
 * @returns
 */

import * as _ from "lodash";
import {
  SCHEME_FLOW_ABOUT_OPTIONS,
  SCHEME_FLOW_OPTIONS,
} from "../utils/constants";

export const header_validator = (msg: any, testCase: any): boolean => {
  const header = msg.payload.buttonChoices.header.trim();
  const expected = testCase.response.choices.header.trim();

  if (expected === header) return true;
  return false;
};

/**
 *
 * @param msg
 * @param testCase
 * @returns
 */
export const choice_validator = (msg: any, testCase?: any): boolean => {
  // verify choice capitalisation
  let result = true;
  msg.payload.buttonChoices.choices.forEach((choice: any) => {
    const text = choice.text.trim();
    if (text.length === 0 || text[0] !== text[0].toUpperCase())
      result = result && false;
    else result = result && true;
  });

  return result;
};

/**
 *
 * @param msg
 * @param testCase
 * @returns
 */
export const scheme_flow_choice_validator = (
  msg: any,
  testCase: any
): boolean => {
  // verify the header
  const buttonChoices = msg.payload.buttonChoices;
  const inputLanguage: any = msg.transformer.metaData.inputLanguage.trim();
  return _.isEqual(buttonChoices, SCHEME_FLOW_OPTIONS[inputLanguage]);
};

/**
 *
 * @param msg
 * @param testCase
 * @returns
 */
export const about_choice_validator = (msg: any, testCase: any): boolean => {
  const buttonChoices = msg.payload.buttonChoices;
  const inputLanguage: any = msg.transformer.metaData.inputLanguage.trim();
  return _.isEqual(buttonChoices, SCHEME_FLOW_ABOUT_OPTIONS[inputLanguage]);
};
