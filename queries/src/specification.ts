/**
 * Things like capitalisation can be handled at the validator level themselves
 */

const guidedSchemeFlowTestCase = {
  title: "Scheme Flow About Scheme",
  isGuided: true,
  flow: "scheme",
  conversationId: "c4e4a6e7-8f7b-4d6c-a5b4-3e2d1c0b9a8b",
  userId: "a1b2c3d4-e5f6-4g3h-8i7j-9k0l1m2n3o4p",
  messages: [
    {
      messageId: "b9a8c7d6-e5f4-4g3h-a2b1-c0d9e8f7a6b5",
      question: "Guided: scheme",
      response: {
        text: "Please select or type the name of your scheme",
        choices: {
          header: "Please select or type the name of your scheme",
        },
      },
      validators: ["text_validator", "header_validator", "choice_validator"], // btn validator checks - Capitalisation && duplicates
    },
    {
      messageId: "d4c3b2a1-1m2n3o4p-5q6r-7s8t-9u0v1w2x3y4z",
      question: "Farm Pond",
      response: {
        text: "Please select an option",
        choices: {
          header: "Please select an option",
        },
      },
      validators: ["text_validator", "scheme_flow_choice_validator"], // scheme-flow-choice_validator checks - the 5 options
    },
    // {
    //   messageId: "a1b2c3d4-e5f6-4g3h-8i7j-9k0l1m2n3o4p",
    //   question: "about",
    //   response: {
    //     text: "<RESPONSE>",
    //     choices: {
    //       header: "Do you want to apply to this scheme?",
    //     },
    //   },
    //   validators: ["llm-similarity", "about_choice_validator"],
    // },
    // {
    //   messageId: "e5f6g7h8-i7j8k9l0-m1n2o3p4-q5r6s7t8u9v0w1x2y3z4",
    //   question: "No",
    //   response: {
    //     text: "Okay, please continue asking any quries related to agriculture.",
    //     choices: {
    //       header: "Please select an option",
    //     },
    //   },
    //   validators: ["text_validator", "choice_validator"],
    // },
  ],
};

export const Suite = {
  title: "RAJAI - Queries Suite",
  botId: "a899de5a-17ec-4f2f-aa30-aa26ad74b6b4",
  testCases: [guidedSchemeFlowTestCase],
};
