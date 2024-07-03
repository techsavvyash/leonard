// import { expect } from "chai";

describe("Guided Flows", () => {
  beforeEach("Login via deafult OTP", () => {
    cy.visit("https://rajai-staging.vercel.app");
    cy.get('[name="phone"]').type("9876543210");
    cy.contains("button", "आगे बढ़ें").click();
    Array.from({ length: 4 }, (_, index) => index + 1).forEach((num) => {
      cy.get(`[aria-label="Digit ${num} of OTP"]`).type(`${num}`);
    });
    cy.contains("button", "आगे बढ़ें").click();
    cy.contains("div", "मुझसे खेती के बारे में कुछ भी पूछें").should(
      "be.visible"
    );
    cy.wait(200);
  });

  describe("Pest Flow - Hindi", () => {
    beforeEach("triggers pest flow", () => {
      cy.wait(500); // TODO: Figure out a way to remove this
      cy.contains("p", "कीट")
        .should("be.visible") // Wait for the element to be visible
        .should("not.be.disabled") // Ensure the element is not disabled
        .click();
      cy.wait(200);

      // cy.get(".Bubble typing").should("not.exist");
    });

    it("test for basic sentences", () => {
      cy.get('[data-testid="message-speaker-button"]').should(
        "not.be.disabled"
      );
      cy.contains(
        "span",
        "यह बहुत दुख की बात है कि आपकी फसल कीट/बीमारी के हमले के खतरे से तनाव में है। "
      ).should("be.visible");
      cy.contains("h5", "प्रभावित फसल का नाम टाइप करें").should("be.visible");
    });

    it("textarea should be searchable", () => {
      let initialLength = 0;
      cy.get(".Popup-body")
        .children()
        .then((children) => (initialLength = children.length));
      cy.get(
        'textarea#inputBox[placeholder="यहां नाम खोजें"][variant="outlined"]'
      ).type("बाजरा");
      cy.get(".Popup-body")
        .children()
        .should((children) => {
          expect(children.length).to.be.lessThan(initialLength);
        });
    });

    describe("Guided Pest Flow with both pests and symptoms", () => {
      beforeEach("select bajra", () => {
        cy.contains("div", "बाजरा").click();
      });

      it("get pest information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook
        const expectedInfoTypes = ["कीट", "लक्षण"];
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedInfoTypes[index]);
          });
        cy.get(".Popup-body").children().first().click();

        cy.contains(
          "h5",
          "कृपया अपनी फसल को प्रभावित करने वाले सही कीट/रोग पर क्लिक करें"
        );
        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        const expectedTexts = [
          "पौध संरक्षण पर अन्य प्रश्न",
          "मुखपृष्ठ पर वापस",
        ];
        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });
        cy.get("div")
          .contains("div", "मुखपृष्ठ पर वापस", {
            matchCase: false,
          })
          .click();
        cy.get("div").contains("div", "मुझसे खेती के बारे में कुछ भी पूछें", {
          matchCase: false,
        });
      });

      it("restart flow - get pest information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook
        const expectedInfoTypes = ["कीट", "लक्षण"];
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedInfoTypes[index]);
          });
        cy.get(".Popup-body").children().first().click();

        cy.contains(
          "h5",
          "कृपया अपनी फसल को प्रभावित करने वाले सही कीट/रोग पर क्लिक करें"
        );
        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        const expectedTexts = [
          "पौध संरक्षण पर अन्य प्रश्न",
          "मुखपृष्ठ पर वापस",
        ];
        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });
        cy.get("div")
          .contains("div", "पौध संरक्षण पर अन्य प्रश्न", {
            matchCase: false,
          })
          .click();
        cy.contains("h5", "प्रभावित फसल का नाम टाइप करें");
      });

      it("get symptoms information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook
        const expectedInfoTypes = ["कीट", "लक्षण"];
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedInfoTypes[index]);
            const text = $child.text();
            if (text.includes("लक्षण")) {
              cy.wrap($child).click();
            }
          });
        // cy.get("div").contains("div", "लक्षण").click(); //.children().first().click();

        cy.get("span").contains(
          "span",
          "उन लक्षणों को दर्ज करें जो आप बाजरा के लिए सामना कर रहे हैं"
        );

        // cy.contains("p", "विवरण सुनें").parent().should("be.enabled");

        cy.get("textarea.Input.Input--outline.Composer-input").type(
          "पीले पत्ते"
        );

        cy.get("button")
          .as("btn")
          .contains("button", "send", { matchCase: false });
        cy.get("@btn").should("be.visible");

        cy.get("button")
          .contains("button", "send", { matchCase: false })
          .click();

        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        cy.contains("h5", "कृपया एक विकल्प चुनें");
        const expectedTexts = [
          "पौध संरक्षण पर अन्य प्रश्न",
          "मुखपृष्ठ पर वापस",
        ];
        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .as("popup")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });

        cy.get("div")
          .contains("div", "मुखपृष्ठ पर वापस", {
            matchCase: false,
          })
          .click();
        cy.get("div").contains("div", "मुझसे खेती के बारे में कुछ भी पूछें", {
          matchCase: false,
        });
      });

      it("flow restart - clicking other question after get symptoms information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook
        const expectedInfoTypes = ["कीट", "लक्षण"];
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedInfoTypes[index]);
            const text = $child.text();
            if (text.includes("लक्षण")) {
              cy.wrap($child).click();
            }
          });
        // cy.get("div").contains("div", "लक्षण").click(); //.children().first().click();

        cy.get("span").contains(
          "span",
          "उन लक्षणों को दर्ज करें जो आप बाजरा के लिए सामना कर रहे हैं"
        );

        // cy.contains("p", "विवरण सुनें").parent().should("be.enabled");

        cy.get("textarea.Input.Input--outline.Composer-input").type(
          "पीले पत्ते"
        );

        cy.get("button")
          .as("btn")
          .contains("button", "send", { matchCase: false });
        cy.get("@btn").should("be.visible");

        cy.get("button")
          .contains("button", "send", { matchCase: false })
          .click();

        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        cy.contains("h5", "कृपया एक विकल्प चुनें");
        const expectedTexts = [
          "पौध संरक्षण पर अन्य प्रश्न",
          "मुखपृष्ठ पर वापस",
        ];
        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .as("popup")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });

        cy.get("div")
          .contains("div", "पौध संरक्षण पर अन्य प्रश्न", {
            matchCase: false,
          })
          .click();
        cy.contains("h5", "प्रभावित फसल का नाम टाइप करें");
      });
    });

    describe("Guided Pest Flow with only pests", () => {
      beforeEach("select bajra", () => {
        cy.contains("div", "नाइजर").click();
      });

      it("get pest information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook
        // const expectedInfoTypes = ["कीट", "लक्षण"];
        // cy.get(".Popup-body")
        //   .children()
        //   .each(($child, index) => {
        //     cy.wrap($child).should("have.text", expectedInfoTypes[index]);
        //   });
        // cy.get(".Popup-body").children().first().click();

        cy.contains(
          "h5",
          "कृपया अपनी फसल को प्रभावित करने वाले सही कीट/रोग पर क्लिक करें"
        );
        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        const expectedTexts = [
          "पौध संरक्षण पर अन्य प्रश्न",
          "मुखपृष्ठ पर वापस",
        ];
        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });
        cy.get("div")
          .contains("div", "मुखपृष्ठ पर वापस", {
            matchCase: false,
          })
          .click();
        cy.get("div").contains("div", "मुझसे खेती के बारे में कुछ भी पूछें", {
          matchCase: false,
        });
      });

      it("restart flow - get pest information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook
        cy.contains(
          "h5",
          "कृपया अपनी फसल को प्रभावित करने वाले सही कीट/रोग पर क्लिक करें"
        );
        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        const expectedTexts = [
          "पौध संरक्षण पर अन्य प्रश्न",
          "मुखपृष्ठ पर वापस",
        ];
        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });
        cy.get("div")
          .contains("div", "पौध संरक्षण पर अन्य प्रश्न", {
            matchCase: false,
          })
          .click();

        cy.contains("h5", "प्रभावित फसल का नाम टाइप करें");
      });
    });
  });

  describe("Pest Flow - English", () => {
    const expectedTexts = [
      "Other questions on the plant protection",
      "Back to home page",
    ];
    const expectedInfoTypes = ["Pest", "Symptoms"];

    beforeEach("triggers pest flow", () => {
      cy.wait(500); // TODO: Figure out a way to remove this
      cy.get(
        'button.MuiButtonBase-root[data-testid="navbar-hamburger-menu"]'
      ).click();
      cy.get("button.MuiButtonBase-root.Sidemenu_button")
        .contains("button", "ENG")
        .click();
      cy.contains("p", "Pest")
        .should("be.visible") // Wait for the element to be visible
        .should("not.be.disabled") // Ensure the element is not disabled
        .click();
      cy.wait(200);

      // cy.get(".Bubble typing").should("not.exist");
    });

    it("test for basic sentences", () => {
      cy.get('[data-testid="message-speaker-button"]').should(
        "not.be.disabled"
      );
      cy.contains(
        "span",
        "It's really unfortunate to know that your crop is under stress due to pest/disease attack"
      ).should("be.visible");
      cy.contains("h5", "Type the name of the affected crop").should(
        "be.visible"
      );
    });

    it("textarea should be searchable", () => {
      let initialLength = 0;
      cy.get(".Popup-body")
        .children()
        .then((children) => (initialLength = children.length));
      cy.get(
        'textarea#inputBox[placeholder="Please search here"][variant="outlined"]'
      ).type("Millet");
      cy.get(".Popup-body")
        .children()
        .should((children) => {
          expect(children.length).to.be.lessThan(initialLength);
        });
    });

    describe("Guided Pest Flow with both pests and symptoms", () => {
      beforeEach("select bajra", () => {
        cy.contains("div", "Millet").click();
      });

      it("get pest information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook

        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedInfoTypes[index]);
          });
        cy.get(".Popup-body").children().first().click();

        cy.contains(
          "h5",
          "Please click on the correct pest/disease affecting your crop"
        );
        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });
        cy.get("div")
          .contains("div", "Back to home page", {
            matchCase: false,
          })
          .click();
        cy.get("div").contains("div", "Ask me anything about farming", {
          matchCase: false,
        });
      });

      it("Should restart pest flow by clicking other questions after pest option", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook

        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedInfoTypes[index]);
          });
        cy.get(".Popup-body").children().first().click();

        cy.contains(
          "h5",
          "Please click on the correct pest/disease affecting your crop"
        );
        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });
        cy.get("div")
          .contains("div", "Other questions on the plant protection", {
            matchCase: false,
          })
          .click();

        cy.get("h5").contains("h5", "Type the name of the affected crop", {
          matchCase: false,
        });
      });
      it("get symptoms information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedInfoTypes[index]);
            const text = $child.text();
            if (text.includes("Symptoms")) {
              cy.wrap($child).click();
            }
          });

        cy.get("span").contains(
          "span",
          "Enter the symptoms that you are facing for millet",
          {
            matchCase: false,
          }
        );

        cy.get("textarea.Input.Input--outline.Composer-input").type(
          "Yellow Leaves"
        );

        cy.get("button")
          .as("btn")
          .contains("button", "send", { matchCase: false });
        cy.get("@btn").should("be.visible");

        cy.get("button")
          .contains("button", "send", { matchCase: false })
          .click();

        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        cy.contains("h5", "Please select a pest");

        cy.get("div")
          .contains("div", "back to home page", {
            matchCase: false,
          })
          .click();
        cy.get("div").contains("div", "Ask me anything about farming", {
          matchCase: false,
        });
      });

      it("Should restart pest flow by clicking other questions after symptom option", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedInfoTypes[index]);
            const text = $child.text();
            if (text.includes("Symptoms")) {
              cy.wrap($child).click();
            }
          });

        cy.get("span").contains(
          "span",
          "Enter the symptoms that you are facing for millet",
          {
            matchCase: false,
          }
        );

        cy.get("textarea.Input.Input--outline.Composer-input").type(
          "Yellow Leaves"
        );

        cy.get("button")
          .as("btn")
          .contains("button", "send", { matchCase: false });
        cy.get("@btn").should("be.visible");

        cy.get("button")
          .contains("button", "send", { matchCase: false })
          .click();

        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        cy.contains("h5", "Please select a pest");

        cy.get("div")
          .contains("div", "Other questions on the plant protection", {
            matchCase: false,
          })
          .click();

        cy.get("h5").contains("h5", "Type the name of the affected crop", {
          matchCase: false,
        });
      });
    });

    describe("Guided Pest Flow with only pests", () => {
      beforeEach("select bajra", () => {
        cy.contains("div", "Niger").click();
      });

      it("get pest information", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook

        cy.contains(
          "h5",
          "Please click on the correct pest/disease affecting your crop"
        );
        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });
        cy.get("div")
          .contains("div", "back to home page", {
            matchCase: false,
          })
          .click();
        cy.get("div").contains("div", "Ask me anything about farming", {
          matchCase: false,
        });
      });

      it("restart pest flow by selecting other questions", () => {
        cy.wait(500); // this waits for any delays in getting response after the beforeEach hook

        cy.contains(
          "h5",
          "Please click on the correct pest/disease affecting your crop"
        );
        cy.get(".Popup-body").children().should("have.length.above", 0);
        cy.get(".Popup-body").children().first().click();

        cy.get(".Popup-body").children().should("have.length", 2);
        cy.get(".Popup-body")
          .children()
          .each(($child, index) => {
            cy.wrap($child).should("have.text", expectedTexts[index]);
          });
        cy.get("div")
          .contains("div", "Other questions on the plant protection", {
            matchCase: false,
          })
          .click();

        cy.get("h5").contains("h5", "Type the name of the affected crop", {
          matchCase: false,
        });
      });
    });
  });
});
