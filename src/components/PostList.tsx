import type { Post, User } from "@prisma/client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import VoteButton from "./VoteButton";

type PostWithAuthor = Post & {
  author: User;
  _count: {
    comments: number;
  };
};

type PostListItemProps = {
  post: PostWithAuthor;
};

type PostListProps = {
  posts: PostWithAuthor[];
};

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const { data: sessionData } = useSession();
  // check if the user has already voted on this post
  const { data: hasVoted } = api.post.hasVoted.useQuery({ postId: post.id });

  const context = api.useContext();
  const addVote = api.post.addVote.useMutation({
    async onSuccess() {
      await context.post.getPosts.invalidate();
    },
  });
  const removeVote = api.post.removeVote.useMutation({
    async onSuccess() {
      await context.post.getPosts.invalidate();
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

  const { title, slug } = post;
  return (
    <li className="flex items-center gap-6 border-b border-dotted border-neutral-600 px-2 py-3 last-of-type:border-b-0">
      <div className="flex min-w-[15%] flex-col items-center justify-center gap-1 px-3 md:min-w-[10%]">
        <VoteButton
          onClick={() => handleVote(hasVoted ? "remove" : "add")}
          voteType="add"
          disabled={!sessionData && true}
        />
        <div className="bg-neutral-600 px-2 py-1 text-2xl text-neutral-50">
          {post._count.votes}
        </div>
      </div>
      <div>
        <div>
          <Link href={`/posts/${slug}`} className="text-xl">
            {title}
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

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <>
      {posts?.length ? (
        <ul className="w-100 flex flex-col">
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        "No posts found"
      )}
    </>
  );
};

export default PostList;
