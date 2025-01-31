import { redis, redisKeys } from "../config/redis";

/**
 * Check if a post ID exists in Redis.
 * @param platform - The platform (e.g., reddit, mastodon, twitter).
 * @param postId - The ID of the post to check.
 * @returns True if the post exists, otherwise false.
 */
export async function postExistsInRedis(
  platform: string,
  postId: string
): Promise<boolean> {
  const key = redisKeys[`${platform}_posts` as keyof typeof redisKeys];
  const score = await redis.zscore(key, postId);
  return score !== null;
}

/**
 * Store a post ID with a timestamp in Redis.
 * @param platform - The platform (e.g., reddit, mastodon, twitter).
 * @param postId - The ID of the post to store.
 */
export async function storePostId(
  platform: string,
  postId: string
): Promise<void> {
  const key = redisKeys[`${platform}_posts` as keyof typeof redisKeys];
  const timestamp = Date.now();
  await redis.zadd(key, timestamp.toString(), postId);
}

/**
 * Delete post IDs older than 1 hour from Redis.
 * @param platform - The platform (e.g., reddit, mastodon, twitter).
 */
export async function deleteOldPostIds(platform: string): Promise<void> {
  const key = redisKeys[`${platform}_posts` as keyof typeof redisKeys];
  const oneHourAgo = Date.now() - 3600 * 1000;
  await redis.zremrangebyscore(key, 0, oneHourAgo.toString());
}
