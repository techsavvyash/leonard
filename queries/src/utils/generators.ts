import { v4 as uuidv4 } from "uuid";

export const generateMsg = (
  text: string,
  botId: string,
  messageId = uuidv4(),
  convId = uuidv4(),
  userID = uuidv4()
) => {
  // userID = uuidv4();
  // convId = uuidv4();
  // messageId = uuidv4();

  return {
    app: botId,
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
