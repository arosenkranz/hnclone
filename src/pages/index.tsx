import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Header } from "~/components/Header";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: userData } = api.user.getUsersPosts.useQuery();
  console.log(userData);

  const { data: posts } = api.post.getPosts.useQuery();

  return (
    <>
      <Head>
        <title>Bits of News</title>
        <meta name="description" content="Your place for the bits." />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <div className="min-h-screen flex-col items-center justify-center">
        <Header />
        <main className="mb-10 p-3">
          <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4">
            <div className="flex flex-col items-center gap-2">
              {posts && (
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-center text-3xl font-bold">
                    Latest Posts
                  </h2>
                  <div className="flex flex-col gap-2">
                    {posts.map((post) => (
                      <Link
                        href={`/posts/${post.slug}`}
                        key={post.id}
                        className="flex flex-col gap-2"
                      >
                        <h3 className="text-2xl font-bold">
                          {post.title} - {post.author.name}
                        </h3>
                        <p className="text-xl">
                          {post.createdAt.toDateString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
