import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MainLayout from "~/layouts/MainLayout";
import { api } from "~/utils/api";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export const NewPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string | undefined>("");
  const router = useRouter();

  const mutation = api.post.createPost.useMutation({
    async onSuccess(_, { slug }) {
      await router.push(`/posts/${slug}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      return;
    }

    const slug = title.toLowerCase().replace(/ /g, "-");

    mutation.mutate({ title, content, slug });
    setTitle("");
    setContent("");
  };

  return (
    <MainLayout pageTitle="New Post" description="Create a new post">
      <div className="flex flex-col">
        <div className="mb-3 border-b pb-3">
          <h2 className="text-2xl font-semibold leading-6 text-neutral-900">
            Create a new post
          </h2>
          <p className="mt-2 max-w-4xl text-sm text-neutral-800">
            Let people know what you're thinking.
          </p>
        </div>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-neutral-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-neutral-900"
            >
              Content
            </label>
            <MDEditor
              value={content}
              onChange={setContent}
              preview="edit"
              hideToolbar={false}
              commands={[]}
              textareaProps={{
                placeholder: "Write your post's content using Markdown.",
              }}
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-neutral-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
