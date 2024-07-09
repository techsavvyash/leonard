import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

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

  const url = "https://ts.dev.bhasai.samagra.io"; // Replace with your Socket.IO server URL

  beforeAll(() => {
    socket = io(url);
  });

  afterAll(() => {
    socket.disconnect();
  });

  const testCases = [
    { id: 1, message: "how to grow wheat?" },
    { id: 2, message: "how to grow paddy?" },
    { id: 3, message: "irrigation practices for wheat?" },
    { id: 4, message: "can I grow peanuts and chickpeas together?" },
    { id: 5, message: "what are the uses of sunflower?" },
  ];

  // it(
  //   "test",
  //   (done) => {
  //     socket.emit("botRequest", generateMsg(testCases[0].message));

  //     socket.on("botResponse", (data) => {
  //       if ((data.payload.text as string).includes("<end/>")) {
  //         console.log("data: ", data);
  //         done();
  //       }
  //     });
  //   },
  //   25 * 1000
  // );

  // testCases.forEach((testCase) => {
  //   it(
  //     `Test case ${testCase.id}`,
  //     (done) => {
  //       socket.emit("botRequest", generateMsg(testCase.message));
  //       socket.on("botResponse", (data) => {
  //         if ((data.payload.text as string).includes("<end/>")) {
  //           console.log("data: ", data);
  //           done();
  //         }
  //       });
  //     },
  //     15 * 1000
  //   );
  // });
});
