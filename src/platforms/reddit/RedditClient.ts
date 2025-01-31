import { REDDIT, URLS } from "../../config/env";
import type { RedditPost } from "./types/RedditPost";
import axios from "axios";

let accessToken: string;

export const fetchRedditPosts = async (
  subreddit: string
): Promise<RedditPost[]> => {
  const response = await axios.get(
    `https://oauth.reddit.com/r/${subreddit}/new.json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.data.children;
};

//Get access token every 24 hours
export const getRedditAccessToken = async (): Promise<void> => {
  const response = await axios.post(
    `${URLS.REDDIT}/api/v1/access_token`,
    `grant_type=client_credentials`,
    {
      auth: {
        username: REDDIT.CLIENT_ID,
        password: REDDIT.CLIENT_SECRET,
      },
    }
  );
  accessToken = response.data.access_token;
};
