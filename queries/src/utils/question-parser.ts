import { DEALER_TYPES } from "./constants";

export const figureOutCommodities = (text: string) => {
  text = text.toLowerCase();
  console.log("Text: ", text);

  return Object.values(DEALER_TYPES)
    .map((_) => {
      if (text.includes(_)) {
        return _;
      }
    })
    .filter((_) => _ !== undefined);
};
