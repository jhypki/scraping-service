import { REDDIT, URLS } from "../../config/env";
import type { RedditPost } from "./types/RedditPost";
import axios, { type AxiosResponse } from "axios";
import type { RedditPostsResponse } from "./types/RedditPostsResponse";
import type { RedditTokenResponse } from "./types/RedditTokenResponse";

let accessToken: string;

export const fetchSubredditPosts = async (
  subreddit: string
): Promise<RedditPost[]> => {
  const response: AxiosResponse<RedditPostsResponse> = await axios.get(
    `${URLS.REDDIT}/r/${subreddit}/new.json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 1000,
      },
    }
  );

  return response.data.data.children;
};

export const fetchSubredditComments = async (
  subreddit: string
): Promise<RedditPost[]> => {
  const response: AxiosResponse<RedditPostsResponse> = await axios.get(
    `${URLS.REDDIT}/r/${subreddit}/comments.json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 1000,
      },
    }
  );

  return response.data.data.children;
};

export const fetchAllRedditComments = async (): Promise<RedditPost[]> => {
  const response: AxiosResponse<RedditPostsResponse> = await axios.get(
    `${URLS.REDDIT}/r/all/comments.json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 1000,
      },
    }
  );

  return response.data.data.children;
};

export const fetchAllRedditPosts = async (): Promise<RedditPost[]> => {
  const response: AxiosResponse<RedditPostsResponse> = await axios.get(
    `${URLS.REDDIT}/r/all/new.json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 1000,
      },
    }
  );

  return response.data.data.children;
};

//Get access token every 24 hours
export const getRedditAccessToken = async (): Promise<void> => {
  const response: AxiosResponse<RedditTokenResponse> = await axios.post(
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
