import type { Post, User } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type PostWithAuthor = Post & {
  author: User;
};

const SinglePost: React.FC<{ post: PostWithAuthor }> = ({ post }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <h2 className=" text-3xl font-bold">{post.title}</h2>
      <p className="text-xl">{post.author.name}</p>
      <p className="text-xl">{post.createdAt.toDateString()}</p>
      <div className="max-w-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
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
