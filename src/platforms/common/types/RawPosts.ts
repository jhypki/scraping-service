/**
 * Represents a Kafka message containing raw posts from a specific platform.
 *
 * @template T - The type of the posts contained in the message.
 * @property {string} platform - The name of the platform from which the posts were scraped.
 * @property {T[]} posts - An array of posts of type T.
 */
export interface RawPostsKafkaMessage<T> {
  platform: string;
  posts: T[];
}
