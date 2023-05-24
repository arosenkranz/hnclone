import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MainLayout from "~/layouts/MainLayout";

import { api } from "~/utils/api";

export const NewPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const context = api.useContext();
  const mutation = api.post.createPost.useMutation({
    async onSuccess() {
      await router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <MainLayout pageTitle="New Post" description="Create a new post">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">New Post</h1>
        <form className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-black px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className="border border-black px-2 py-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="border border-black bg-black px-2 py-1 text-white"
          >
            Submit
          </button>
        </form>
        <hr className="my-4" />

        <Link href="/" className="text-xl underline">
          Go back to home
        </Link>
      </div>
    </MainLayout>
  );
};

export default NewPost;
