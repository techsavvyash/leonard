import { io, Socket } from "socket.io-client";

import { generateMsg } from "./utils/generators";
import { VALIDATORS } from "./validators";

export const parseTestCase = (testCase: any, botId: any) => {
  const msgs = testCase.messages;
  const { title, conversationId, userId } = testCase;

  describe(`${title}`, () => {
    let socket: Socket;
    const url = "https://ts.dev.bhasai.samagra.io";

    const replyHandler = (data: any, msg: any, done: any) => {
      if (
        (msg.validators as string[])
          .map((validator: string): boolean => {
            return VALIDATORS[validator](data, msg);
          })
          .reduce((_, __) => _ && __)
      ) {
        done();
      }
    };

    beforeAll((done) => {
      // Initialize the Socket.io connection
      socket = io(url); // Replace with your Socket.io URL
      socket.on("connect", () => {
        done();
      });
    });

    afterAll((done) => {
      // Close the Socket.io connection after tests are done
      if (socket.connected) {
        socket.disconnect();
      }
      done();
    });

    it(`${conversationId}-${userId}`, (done) => {
      let idx = 0;

      const nextTest = () => {
        if (idx < msgs.length) {
          const msg = msgs[idx];
          const { question, messageId } = msg;
          socket.emit(
            "botRequest",
            generateMsg(question, botId, messageId, conversationId, userId)
          );

          socket.once("botResponse", (data) => {
            try {
              console.log("data: ", data);
              // const validatorResponses =
              expect(
                (msg.validators as string[])
                  .map((validator: string): boolean => {
                    console.log("validator: ", validator);
                    const val = VALIDATORS[validator];
                    console.log("val: ", val);
                    return val(data, msg);
                  })
                  .reduce((_, __) => _ && __)
              ).toBe(true);
              idx++;
              nextTest(); // Move to the next test case
            } catch (error) {
              done(error); // End test on error
            }
          });
        } else {
          done(); // All test cases passed
        }
      };

      nextTest(); // Start the test sequence
    });

    // for (let i = 0; i < msgs.length; i++) {
    //   const msg = msgs[i];
    //   const { question, messageId } = msg;
    //   it(, (done) => {
    //     socket.emit("botRequest");

    //     socket.once("botResponse", (data: any) => replyHandler(data, done));
    //     // socket.off("botResponse", replyHandler);
    //   });
    // }
  });
};
