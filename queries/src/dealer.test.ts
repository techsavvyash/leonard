import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import {
  parseDealerResponse,
  sanityCheckDealerResponse,
} from "./validators/dealers";
import { figureOutCommodities } from "./utils/question-parser";

const generateMsg = (text: string) => {
  const userID = uuidv4();
  const convId = uuidv4();
  const messageId = uuidv4();

  return {
    app: "a899de5a-17ec-4f2f-aa30-aa26ad74b6b4",
    payload: {
      text,
      metaData: {
        phoneNumber: "8059975866",
        latitude: "28.8837563",
        longitude: "76.5839359",
        city: "Rohtak",
        state: "HARYANA",
        ip: "122.173.29.75",
        hideMessage: false,
      },
    },
    tags: [],
    from: {
      userID,
    },
    messageId: {
      Id: messageId,
      channelMessageId: convId,
    },
    userId: userID,
  };
};

describe("Socket.IO API Test Suite", () => {
  let socket: Socket;

  const url = "https://ts.dev.bhasai.samagra.io";

  // beforeEach(() => {
  //   socket = io(url);
  // });

  // afterEach(() => {
  //   socket.disconnect();
  // });

  const testCases = [
    { id: 1, message: "seed dealers in barmer" },
    { id: 2, message: "seed dealers in bikaner" },
    { id: 3, message: "fertilizers dealers in ajmer" },
    { id: 4, message: "seed and fertilizers dealers in ajmer" },
    { id: 5, message: "machinery dealers in ajmer" },
  ];

  testCases.forEach((testCase) => {
    it(
      `Test case ${testCase.id}`,
      (done) => {
        socket = io(url);
        socket.emit("botRequest", generateMsg(testCase.message));
        socket.on("botResponse", (data) => {
          if ((data.payload.text as string).includes("<end/>")) {
            socket.disconnect();
            const text = (data.payload.text as string)
              .trim()
              .split("<end/>")[0];
            expect(text).not.toBe("");
            expect(text).not.toContain("<end/>");
            const parsed = parseDealerResponse(text);
            console.log("parsed: ", parsed);
            const commodities = figureOutCommodities(testCase.message);
            console.log("commodities: ", commodities);
            console.log(sanityCheckDealerResponse(parsed, commodities));
            if (sanityCheckDealerResponse(parsed, commodities)) {
              done();
            }
            // } else {
            //   fail(
            //     `Invalid response from socket for query \n${testCase.message}`
            //   );
            // }
          }
        });
      },
      25 * 1000
    );
  });
});
