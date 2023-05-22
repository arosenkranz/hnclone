import type { Post, User } from "@prisma/client";
import Link from "next/link";

interface IPost extends Post {
  author: User;
  _count: {
    comments: number;
  };
}

interface IPostListItemProps {
  post: IPost;
}

interface IPostListProps {
  posts: IPost[];
}

const PostListItem: React.FC<IPostListItemProps> = ({ post }) => {
  const { title, slug } = post;
  return (
    <li className="border-b border-dotted border-gray-600 px-2 py-3 last-of-type:border-b-0">
      <Link href={`/posts/${slug}`}>{title}</Link>
      {post.author && (
        <div className="text-sm text-gray-500">
          By {post.author.name} on {post.createdAt.toDateString()}
        </div>
      )}
      <div className="text-sm text-gray-500">
        {post._count.comments} comments
      </div>
    </li>
  );
};

export const PostList: React.FC<IPostListProps> = ({ posts }) => {
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
