import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from "~/components/Header";
import { CommentForm } from "~/components/CommentForm";

import { api } from "~/utils/api";

const Post: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: post,
    isError,
    isLoading,
    error,
  } = api.post.getPostById.useQuery({
    slug: slug as string,
  });

  if (isLoading || !post) {
    return (
      <>
        <Head>
          <title>Loading...</title>
          <meta name="description" content="Your place for the bits." />
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        <div className="min-h-screen flex-col items-center justify-center">
          <Header />
          <main className="mb-10 p-3">
            <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4">
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-center text-3xl font-bold">Loading...</h2>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <>
        <Head>
          <title>Error</title>
          <meta name="description" content="Your place for the bits." />
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        <div className="min-h-screen flex-col items-center justify-center">
          <Header />
          <main className="mb-10 p-3">
            <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4">
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-center text-3xl font-bold">Error</h2>
                <p className="text-xl">{error?.message}</p>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Bits of News</title>
        <meta name="description" content={post.content || ""} />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <div className="min-h-screen flex-col ">
        <Header />
        <main className="mb-10 p-3">
          <div className="container mx-auto flex flex-col gap-12 px-4">
            <div className="flex flex-col gap-2">
              <h2 className=" text-3xl font-bold">{post.title}</h2>
              <p className="text-xl">{post.author.name}</p>
              <p className="text-xl">{post.createdAt.toDateString()}</p>
              <p className="text-xl">{post.content}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Comments</h2>
              <div className="flex flex-col gap-2">
                {post.comments.map((comment) => (
                  <div className="flex flex-col gap-2" key={comment.id}>
                    <p className="text-xl">{comment.content}</p>
                    <p className="text-xl">{comment.author.name}</p>
                    <p className="text-xl">
                      {comment.createdAt.toDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <CommentForm postId={post.id} />
            <div>
              <Link href="/">Back to Home</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Post;
