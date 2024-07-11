import { io, Socket } from "socket.io-client";
import {
  parseDealerResponse,
  sanityCheckDealerResponse,
} from "./validators/dealers";
import { figureOutCommodities } from "./utils/question-parser";
import { generateMsg } from "./utils/generators";
import { RAJAI_BOT_ID } from "./utils/constants";

describe("Socket.IO API Test Suite", () => {
  let socket: Socket;

  const url = "https://ts.dev.bhasai.samagra.io";

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
        socket.emit("botRequest", generateMsg(testCase.message, RAJAI_BOT_ID));
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
