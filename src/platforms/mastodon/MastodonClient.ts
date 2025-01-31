import type { MastodonPost } from "./types/MastodonPost";
import { URLS } from "../../config/env";
import axios from "axios";

export const fetchMastodonPosts = async (): Promise<MastodonPost[]> => {
  const response = await axios.get(`${URLS.MASTODON}/api/v1/timelines/public`);
  return response.data;
};
