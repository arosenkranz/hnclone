import type { NextPage } from "next";
import MainLayout from "~/layouts/MainLayout";
import PostList from "~/components/PostList";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: posts } = api.post.getPosts.useQuery();

  return (
    <MainLayout pageTitle="Home" description="Home page">
      <p className="w-100 bg-neutral-200 p-4 text-center">
        Welcome to Bits of News! This is a demo social news site to showcase{" "}
        <a
          href="https://datadoghq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Datadog
        </a>
        .
      </p>

      {posts && <PostList posts={posts} />}
    </MainLayout>
  );
};

export default Home;
