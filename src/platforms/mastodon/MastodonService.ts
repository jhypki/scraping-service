import { fetchMastodonPosts } from "./MastodonClient";
import { sendToKafka } from "../../services/KafkaService";
import { type MastodonPost } from "./types/MastodonPost";
import type { RawPostsKafkaMessage } from "../common/types/RawPosts";
import { Platforms } from "../../enums/Platforms";
import {
  storePostId,
  postExistsInRedis,
  deleteOldPostIds,
} from "../../services/RedisService";

export const fetchAndSendMastodonPosts = async () => {
  const posts = await fetchMastodonPosts();

  const newPosts = [];

  for (const post of posts) {
    const exists = await postExistsInRedis(Platforms.MASTODON, post.id);
    if (!exists) {
      await storePostId(Platforms.MASTODON, post.id);
      newPosts.push(post);
    }
  }

  if (newPosts.length > 0) {
    await sendToKafka<RawPostsKafkaMessage<MastodonPost>>({
      platform: Platforms.MASTODON,
      posts: newPosts,
    });
    console.log(`[MASTODON] Sent ${newPosts.length} new posts to Kafka.`);
  } else {
    console.log("[MASTODON] No new posts to process.");
  }

  await deleteOldPostIds(Platforms.MASTODON);
};
