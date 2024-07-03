import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const generateMsg = (text: string) => {
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
      userID: "6c7d65f2-1e32-467e-822a-9b4f1d5d07f8",
    },
    messageId: {
      Id: uuidv4(),
      channelMessageId: uuidv4(),
    },
    userId: "6c7d65f2-1e32-467e-822a-9b4f1d5d07f8",
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
    { id: 1, message: "Machine dealers in ajmer" },
    { id: 2, message: "अजमेर मे मशीनरी vikreta" },
    { id: 3, message: "बारमेर मे बीज विक्रेता" },
    { id: 4, message: "Where to get sunflower seed in barmer" },
    { id: 5, message: "Where to get sunflower seed in ajmer?" },
  ];

  it(
    "test",
    (done) => {
      socket.emit("botRequest", generateMsg(testCases[0].message));

      socket.on("botResponse", (data) => {
        console.log("data");
        done();
      });
    },
    25 * 1000
  );

  /*testCases.forEach((testCase) => {
    test(
      `Test case ${testCase.id}`,
      (done) => {
        socket.emit("botRequest", generateMsg(testCase.message));

        socket.on("message", (data: string) => {
          try {
            console.log("data: ", data);
            expect(data).toBeDefined();
            done();
          } catch (error) {
            done(error);
          }
        });
      },
      15 * 1000
    );
  });*/
});
