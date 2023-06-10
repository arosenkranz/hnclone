import type { PostWithAuthor } from "~/types";
import { render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import SinglePost from "~/components/SinglePost";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("../../utils/api", () => ({
  api: {
    useContext: jest.fn(() => ({
      post: {
        getPosts: {
          invalidate: jest.fn(),
        },
        hasVoted: {
          invalidate: jest.fn(),
        },
      },
    })),
    post: {
      getPostBySlug: {
        useQuery: jest.fn(() => ({
          data: post,
          isLoading: false,
        })),
      },
    },
  },
}));

jest.mock("next/dynamic", () => () => {
  const MockComponent = () => <div />;
  return MockComponent;
});

const post: PostWithAuthor = {
  id: "post-1",
  title: "Test Post",
  content: "This is a test post",
  slug: "test-post",
  authorId: "1",
  author: {
    name: "John Doe",
    id: "1",
    email: "user@example.com",
  },
  createdAt: new Date("2022-01-01"),
  _count: {
    votes: 0,
    comments: 0,
  },
};

beforeEach(() => {
  (useSession as jest.Mock).mockReturnValue({
    data: { user: { name: "Alice" } },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders the post title", async () => {
  render(<SinglePost post={post} />);
  const titleElement = screen.getByText("Test Post");
  await waitFor(() => {
    expect(titleElement).toBeInTheDocument();
  });
});

test("renders the post content", async () => {
  render(<SinglePost post={post} />);
  const contentElement = screen.getByText("This is a test post");
  await waitFor(() => {
    expect(contentElement).toBeInTheDocument();
  });
});

test("renders the post author", async () => {
  render(<SinglePost post={post} />);
  const authorElement = screen.getByText("Posted by John Doe");
  await waitFor(() => {
    expect(authorElement).toBeInTheDocument();
  });
});

test("renders the post creation date", async () => {
  render(<SinglePost post={post} />);
  const dateElement = screen.getByText("on January 1, 2022");
  await waitFor(() => {
    expect(dateElement).toBeInTheDocument();
  });
});

test("renders the comments section", async () => {
  render(<SinglePost post={post} />);
  const commentsElement = screen.getByText("Comments");
  await waitFor(() => {
    expect(commentsElement).toBeInTheDocument();
  });
});

test("renders the comment form if user is logged in", async () => {
  render(<SinglePost post={post} />);
  const commentFormElement = screen.getByLabelText("Leave a comment");
  await waitFor(() => {
    expect(commentFormElement).toBeInTheDocument();
  });
});

test("renders the login prompt if user is not logged in", async () => {
  (useSession as jest.Mock).mockReturnValue({ data: null });
  render(<SinglePost post={post} />);
  const loginPromptElement = screen.getByText(
    "You must be logged in to comment."
  );
  await waitFor(() => {
    expect(loginPromptElement).toBeInTheDocument();
  });
});
