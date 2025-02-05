import {
  storePostId,
  postExistsInRedis,
  deleteOldPostIds,
} from "../../services/RedisService";
import { sendToKafka } from "../../services/KafkaService";
import {
  fetchSubredditPosts,
  fetchAllRedditPosts,
  fetchSubredditComments,
  fetchAllRedditComments,
} from "./RedditClient";
import { type RedditPost } from "./types/RedditPost";
import type { RawPostsKafkaMessage } from "../common/types/RawPosts";
import { Platforms } from "../../enums/Platforms";
import { getRedditAccessToken } from "./RedditClient";

export const fetchAndSendSubredditPosts = async (subreddit: string) => {
  const posts = await fetchSubredditPosts(subreddit);

  const newPosts = [];

  for (const post of posts) {
    const exists = await postExistsInRedis(Platforms.REDDIT, post.data.id);
    if (!exists) {
      await storePostId(Platforms.REDDIT, post.data.id);
      newPosts.push(post);
    }
  }

  if (newPosts.length > 0) {
    await sendToKafka<RawPostsKafkaMessage<RedditPost>>({
      platform: Platforms.REDDIT,
      posts: newPosts,
    });
    console.log(`[REDDIT] Sent ${newPosts.length} new posts to Kafka.`);
  } else {
    console.log("[REDDIT] No new posts to process.");
  }

  await deleteOldPostIds(Platforms.REDDIT);
};

export const refreshRedditAccessToken = async () => {
  await getRedditAccessToken();
};

export const fetchAndSendSubredditComments = async (subreddit: string) => {
  const posts = await fetchSubredditComments(subreddit);

  const newPosts = [];

  for (const post of posts) {
    const exists = await postExistsInRedis(Platforms.REDDIT, post.data.id);
    if (!exists) {
      await storePostId(Platforms.REDDIT, post.data.id);
      newPosts.push(post);
    }
  }

  if (newPosts.length > 0) {
    await sendToKafka<RawPostsKafkaMessage<RedditPost>>({
      platform: Platforms.REDDIT,
      posts: newPosts.map((post) => ({
        ...post,
        data: {
          ...post.data,
          title: post.data.body || "",
        },
      })),
    });
    console.log(`[REDDIT] Sent ${newPosts.length} new posts to Kafka.`);
  } else {
    console.log("[REDDIT] No new posts to process.");
  }

  await deleteOldPostIds(Platforms.REDDIT);
};

export const fetchAndSendAllRedditComments = async () => {
  const posts = await fetchAllRedditComments();

  const newPosts = [];

  for (const post of posts) {
    const exists = await postExistsInRedis(Platforms.REDDIT, post.data.id);
    if (!exists) {
      await storePostId(Platforms.REDDIT, post.data.id);
      newPosts.push(post);
    }
  }

  if (newPosts.length > 0) {
    await sendToKafka<RawPostsKafkaMessage<RedditPost>>({
      platform: Platforms.REDDIT,
      posts: newPosts.map((post) => ({
        ...post,
        data: {
          ...post.data,
          title: post.data.body || "",
        },
      })),
    });
    console.log(`[REDDIT] Sent ${newPosts.length} new posts to Kafka.`);
  } else {
    console.log("[REDDIT] No new posts to process.");
  }

  await deleteOldPostIds(Platforms.REDDIT);
};

export const fetchAndSendAllRedditPosts = async () => {
  const posts = await fetchAllRedditPosts();

  const newPosts = [];

  for (const post of posts) {
    const exists = await postExistsInRedis(Platforms.REDDIT, post.data.id);
    if (!exists) {
      await storePostId(Platforms.REDDIT, post.data.id);
      newPosts.push(post);
    }
  }

  if (newPosts.length > 0) {
    await sendToKafka<RawPostsKafkaMessage<RedditPost>>({
      platform: Platforms.REDDIT,
      posts: newPosts,
    });
    console.log(`[REDDIT] Sent ${newPosts.length} new posts to Kafka.`);
  } else {
    console.log("[REDDIT] No new posts to process.");
  }

  await deleteOldPostIds(Platforms.REDDIT);
};
