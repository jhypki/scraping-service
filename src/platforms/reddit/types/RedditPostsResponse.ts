import { type RedditPost } from "./RedditPost";

export interface RedditPostsResponse {
  kind: string;
  data: {
    after: string;
    dist: number;
    modhash: string;
    geo_filter: string;
    children: RedditPost[];
  };
}
