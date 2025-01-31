import Redis from "ioredis";
import { REDIS } from "./env";
import { Platforms } from "../enums/Platforms";

export const redis = new Redis({
  host: REDIS.HOST,
  port: REDIS.PORT,
});

redis.on("connect", () => {
  console.log("Connected to Redis.");
});

redis.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

export const redisKeys = {
  reddit_posts: `${Platforms.REDDIT}_posts`,
  mastodon_posts: `${Platforms.MASTODON}_posts`,
  twitter_posts: `${Platforms.TWITTER}_posts`,
};
