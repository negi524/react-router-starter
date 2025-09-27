import { useLoaderData } from "react-router";
import { logger } from "~/config/logger";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function loader() {
  logger.info(`process.env.APP_ENV=${process.env.APP_ENV}`);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = (await response.json()) as Post[];
  return posts;
}

export default function SampleRoute() {
  const posts = useLoaderData() as Post[];
  return (
    <>
      <h1>Sample page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            id: {post.id}, title: {post.title}
          </li>
        ))}
      </ul>
    </>
  );
}
