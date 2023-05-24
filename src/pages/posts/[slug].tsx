import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import MainLayout from "~/layouts/MainLayout";
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
  } = api.post.getPostBySlug.useQuery({
    slug: slug as string,
  });

  if (isLoading || !post) {
    return (
      <MainLayout pageTitle="Loading..." description="Your place for the bits.">
        <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center text-3xl font-bold">Loading...</h2>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <MainLayout pageTitle="Error" description="Your place for the bits.">
        <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center text-3xl font-bold">Error</h2>
            <p className="text-xl">{error?.message}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle={post.title} description="Your place for the bits.">
      <div className="container mx-auto mb-10 flex max-w-4xl flex-col gap-12 p-3 px-4">
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
                <p className="text-xl">{comment.createdAt.toDateString()}</p>
              </div>
            ))}
          </div>
        </div>
        <CommentForm postId={post.id} slug={post.slug} />
        <div>
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Post;
