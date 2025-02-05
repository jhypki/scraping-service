import cron from "node-cron";
import {
  fetchAndSendAllRedditComments,
  fetchAndSendAllRedditPosts,
  fetchAndSendSubredditComments,
  fetchAndSendSubredditPosts,
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
      console.log(`Fetching posts for ${subreddit.name}`);
      await fetchAndSendSubredditPosts(subreddit.name);
      await fetchAndSendSubredditComments(subreddit.name);
    });
  }

  cron.schedule("*/10 * * * * *", async () => {
    await fetchAndSendMastodonPosts();
  });

  cron.schedule("*/6 * * * * *", async () => {
    await fetchAndSendAllRedditPosts();
  });

  cron.schedule("*/3 * * * * *", async () => {
    await fetchAndSendAllRedditComments();
  });
};
