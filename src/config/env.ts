export const URLS = {
  REDDIT: process.env.REDDIT_URL || "https://www.reddit.com",
  MASTODON: process.env.MASTODON_URL || "https://mastodon.social",
};

export const REDDIT = {
  CLIENT_ID: process.env.REDDIT_CLIENT_ID || "",
  CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET || "",
};

export const KAFKA = {
  BROKER: process.env.KAFKA_BROKER || "",
};

export const REDIS = {
  HOST: process.env.REDIS_HOST || "scraping-service-redis",
  PORT: parseInt(process.env.REDIS_PORT || "6379"),
};
