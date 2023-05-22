import { useState } from "react";
import { api } from "~/utils/api";

interface CommentFormProps {
  postId: string;
  slug: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ postId, slug }) => {
  const [commentBody, setCommentBody] = useState("");
  const context = api.useContext();
  const mutation = api.comment.createComment.useMutation({
    async onSuccess() {
      await context.post.getPostBySlug.invalidate({ slug });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ postId, content: commentBody });
    setCommentBody("");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-center text-3xl font-bold">Comment Form</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <textarea
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="Comment"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <button
          className="w-full rounded-md border border-gray-300 p-2"
          type="submit"
          disabled={mutation.isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
