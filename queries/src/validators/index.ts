import { text_validator } from "./text-validator";
import {
  header_validator,
  choice_validator,
  scheme_flow_choice_validator,
  about_choice_validator,
} from "./popup-validators";

export const VALIDATORS: { [k: string]: (msg: any, testCase: any) => boolean } =
  {
    text_validator,
    header_validator,
    choice_validator,
    scheme_flow_choice_validator,
    about_choice_validator,
  };

// export default VALIDATORS;
