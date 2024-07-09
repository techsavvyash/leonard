/**
 * @description This file has the validation logic for the dealer flow responses
 */

const sampleTestSingle = `Here is the list of dealers in Barmer

dealerName: OM KRISHI SEVA KENDRA GUDAMALANI
dealerType: seed
location: District: Barmer
pincode: 344031
block: Gudamalani
Gram Panchayath: Gudhamalani,

dealerName: MAA DURGA KHAD BEEJ BHANDAR
dealerType: seed
location: District: Barmer
pincode: 344033
block: Adel
Gram Panchayath: Adel,

dealerName: SHRI MAHADEV KHAD BEEJ BHANDAR
dealerType: seed
location: District: Barmer
pincode: 344031
block: Adel
Gram Panchayath: Goliya Jetmal,

dealerName: VANKAL KHAD BEEJ BHANDAR
dealerType: seed
location: District: Barmer
pincode: 344031
block: Adel
Gram Panchayath: Goliya Jetmal,

dealerName: SHREE RAM TREDING COMPANY
dealerType: seed
location: District: Barmer
pincode: 344001
block: Adel
Gram Panchayath: Malpura`;

type DealerInformation = {
  dealerName: string;
  dealerType: string;
  location: string;
  pincode: string;
  block: string;
  "Gram Panchayath": string;
};

const regexForDealerBlock =
  /dealerName:\s*([^\n]+)\ndealerType:\s*([^\n]+)\nlocation:\s*District:\s*([^\n]+)\npincode:\s*([^\n]+)\nblock:\s*([^\n]+)\nGram Panchayath:\s*([^\n]+)/;

const parseDealerBlock = (block: string): DealerInformation => {
  const jsonBlock: {
    [k: string]: string;
  } = {};

  block.split("\n").forEach((line) => {
    const [key, value]: string[] = line.split(":").map((_) => _.trim());
    jsonBlock[key] = value;
  });

  return jsonBlock as DealerInformation;
};

export const parseDealerResponse = (text: string) => {
  const commodityWiseDealers: {
    [k: string]: any[];
  } = {};

  text
    .trim()
    .split("\n\n")
    .forEach((block) => {
      if (regexForDealerBlock.test(block)) {
        const parsedDealerBlock = parseDealerBlock(block);
        if (!commodityWiseDealers[parsedDealerBlock.dealerType]) {
          commodityWiseDealers[parsedDealerBlock.dealerType] = [
            parsedDealerBlock,
          ];
        } else {
          commodityWiseDealers[parsedDealerBlock.dealerType].push(
            parsedDealerBlock
          );
        }
      }
    });

  return commodityWiseDealers;
};

export const sanityCheckDealerResponse = (
  commodityWiseDealers: {
    [k: string]: any[];
  },
  commodityList: string[]
) => {
  const commodities = Object.keys(commodityWiseDealers);
  const objs = commodities.filter((commodity) => {
    return (
      commodityList.includes(commodity) &&
      commodityWiseDealers[commodity].length <= 5
    );
  });
  console.log("filtered commodities: ", objs);
  return objs.length > 0;
};
