export interface MastodonPost {
  id: string;
  created_at: string;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  edited_at: string | null;
  content: string;
  reblog: MastodonPost | null;
  account: {
    id: string;
    username: string;
    acct: string;
    display_name: string;
    locked: boolean;
    bot: boolean;
    discoverable: boolean;
    indexable: boolean;
    group: boolean;
    created_at: string;
    note: string;
    url: string;
    uri: string;
    avatar: string;
    avatar_static: string;
    header: string;
    header_static: string;
    followers_count: number;
    following_count: number;
    statuses_count: number;
    last_status_at: string;
    hide_collections: boolean;
    emojis: any[];
    fields: {
      name: string;
      value: string;
      verified_at: string | null;
    }[];
  };
  media_attachments: {
    id: string;
    type: string;
    url: string;
    preview_url: string;
    remote_url: string | null;
    preview_remote_url: string | null;
    text_url: string | null;
    meta: {
      focus: {
        x: number;
        y: number;
      };
      original: {
        width: number;
        height: number;
        size: string;
        aspect: number;
      };
      small: {
        width: number;
        height: number;
        size: string;
        aspect: number;
      };
    };
    description: string;
    blurhash: string;
  }[];
  mentions: any[];
  tags: {
    name: string;
    url: string;
  }[];
  emojis: any[];
  card: any | null;
  poll: any | null;
}
