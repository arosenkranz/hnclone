import type { Post, User } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type PostWithAuthor = Post & {
  author: User;
};

const SinglePost: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <>
      <h2 className=" text-3xl font-bold">{post.title}</h2>
      <p className="text-xl">{post.author.name}</p>
      <p className="text-xl">{post.createdAt.toDateString()}</p>
      <div className="max-w-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content as string}
        </ReactMarkdown>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Comments</h2>
        <CommentList postId={post.id} />
      </div>
      <CommentForm postId={post.id} slug={post.slug} />
    </>
  );
};

export default SinglePost;
