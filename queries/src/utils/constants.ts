export const DEALER_TYPES = {
  SEED: "seed",
  FERTILIZER: "fertilizers",
  MACHINERY: "machinery",
};

export const RAJAI_BOT_ID = "a899de5a-17ec-4f2f-aa30-aa26ad74b6b4";

export const SCHEME_FLOW_OPTIONS: any = {
  en: {
    header: "Please select an option",
    choices: [
      {
        key: "about",
        text: "About scheme",
        isEnabled: true,
      },
      {
        key: "documents",
        text: "Scheme Status",
        isEnabled: true,
      },
      {
        key: "benefits",
        text: "Documents and Eligibility",
        isEnabled: true,
      },
      {
        key: "questions",
        text: "Other questions on the scheme",
        isEnabled: true,
        showTextInput: true,
      },
      {
        key: "back_to_home",
        text: "Back to home page",
        isEnabled: true,
        action: "home",
      },
    ],
  },
  hi: {
    header: "कृपया एक विकल्प चुनें",
    choices: [
      {
        key: "about",
        text: "योजना के बारे में",
        isEnabled: true,
      },
      {
        key: "documents",
        text: "योजना की स्थिति",
        isEnabled: true,
      },
      {
        key: "benefits",
        text: "डाक्यूमेंट्स एवं योग्यता",
        isEnabled: true,
      },
      {
        key: "questions",
        text: "योजना पर अन्य प्रश्न",
        isEnabled: true,
        showTextInput: true,
      },
      {
        key: "back_to_home",
        text: "मुखपृष्ठ पर वापस",
        isEnabled: true,
        action: "home",
      },
    ],
  },
};

export const SCHEME_FLOW_ABOUT_OPTIONS: any = {
  en: {
    header: "Do you want to apply for this scheme?",
    choices: [
      { key: "Yes", text: "Yes", backmenu: false },
      { key: "No", text: "No", backmenu: false },
    ],
  },
  hi: {
    header: "क्या आप इस योजना के लिए आवेदन करना चाहते हैं?",
    choices: [
      { key: "Yes", text: "हाँ", backmenu: false },
      { key: "No", text: "नहीं", backmenu: false },
    ],
  },
};
