import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "scraping-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const producer = kafka.producer();
