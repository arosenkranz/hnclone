import type { PostListItemProps } from "~/types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import VoteButton from "./VoteButton";

export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
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
    <li className="flex items-center gap-6 border-b border-dotted border-neutral-600 px-2 py-3 last-of-type:border-b-0">
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
      <div>
        <div>
          <Link href={`/posts/${post.slug}`} className="text-xl">
            {post.title}
          </Link>
        </div>
        <div>
          <div className="text-neutral-500">
            By {post.author.name} on {post.createdAt.toDateString()}
          </div>
          <div className="text-neutral-500">
            {post._count.comments} comments
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostListItem;