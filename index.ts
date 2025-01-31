import { Kafka } from "kafkajs";
import { BskyAgent } from "@atproto/api";
import cron from "node-cron";
import { startCronJobs } from "./src/services/CronService";

startCronJobs();
