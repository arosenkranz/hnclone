import type { PostWithAuthor } from "~/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import CommentForm from "~/components/CommentForm";
import CommentList from "~/components/CommentList";
import VoteButton from "~/components/VoteButton";
import MDXComponents from "~/components/MDXComponents";

const SinglePost: React.FC<{ post: PostWithAuthor }> = ({ post }) => {
  const { data: sessionData } = useSession();
  // check if the user has already voted on this post
  const { data: hasVoted } = sessionData
    ? api.post.hasVoted.useQuery({ postId: post.id })
    : { data: 0 };

  const context = api.useContext();
  const addVote = api.post.addVote.useMutation({
    async onSuccess() {
      await context.post.getPosts.invalidate();
      await context.post.hasVoted.invalidate({ postId: post.id });
    },
  });
  const removeVote = api.post.removeVote.useMutation({
    async onSuccess() {
      await context.post.getPosts.invalidate();
      await context.post.hasVoted.invalidate({ postId: post.id });
    },
  });

  const handleVote = (voteType: "add" | "remove") => {
    if (!sessionData) {
      return;
    }

    if (voteType === "add") {
      addVote.mutate({ postId: post.id });
    } else {
      removeVote.mutate({ postId: post.id });
    }
  };

  return (
    <>
      <article className="flex flex-col gap-4 space-y-3 border-b-2 pb-3">
        <div className="flex items-end">
          <div className="flex min-w-[15%] flex-col items-center justify-center gap-1 px-3 md:min-w-[10%]">
            <VoteButton
              onClick={() => handleVote(hasVoted ? "remove" : "add")}
              voteType={hasVoted ? "remove" : "add"}
              disabled={!sessionData && true}
            />
            <div className="bg-neutral-600 px-2 py-1 text-2xl text-neutral-50">
              {post._count.votes}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <div className="flex gap-2">
              <p className="text-sm text-neutral-500">
                Posted by {post.author.name} on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MDXComponents}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <div>
        <h2 className="text-3xl font-bold">Comments</h2>
        <CommentList postId={post.id} />
      </div>
      {sessionData ? (
        <CommentForm postId={post.id} slug={post.slug} />
      ) : (
        <p className="text-xl">You must be logged in to comment.</p>
      )}
    </>
  );
};

export default SinglePost;
