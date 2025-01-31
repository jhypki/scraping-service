import { producer } from "../config/kafka";

export const sendToKafka = async <T>(data: T) => {
  try {
    await producer.connect();

    await producer.send({
      topic: "raw_posts",
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });

    console.log("Raw data sent to Kafka successfully");
    console.log(JSON.stringify(data));
  } catch (error) {
    console.error("Error sending messages to Kafka:", error);
  } finally {
    await producer.disconnect();
  }
};
