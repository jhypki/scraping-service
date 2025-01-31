import cron from "node-cron";
import {
  fetchAndSendRedditPosts,
  refreshRedditAccessToken,
} from "../platforms/reddit/RedditService";
import { fetchAndSendMastodonPosts } from "../platforms/mastodon/MastodonService";
import { SUBREDDITS } from "../platforms/reddit/redditConfig";

export const startCronJobs = () => {
  refreshRedditAccessToken();

  cron.schedule("0 */23 * * *", async () => {
    refreshRedditAccessToken();
  });

  for (const subreddit of SUBREDDITS) {
    cron.schedule(subreddit.cron, async () => {
      await fetchAndSendRedditPosts(subreddit.name);
    });
  }

  cron.schedule("*/5 * * * *", async () => {
    await fetchAndSendMastodonPosts();
  });
};
