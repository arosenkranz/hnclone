import type { PostWithAuthor } from "~/types";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import SinglePost from "~/components/SinglePost";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("SinglePost", () => {
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

  test("renders the post title", () => {
    render(<SinglePost post={post} />);
    const titleElement = screen.getByText("Test Post");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the post content", () => {
    render(<SinglePost post={post} />);
    const contentElement = screen.getByText("This is a test post");
    expect(contentElement).toBeInTheDocument();
  });

  test("renders the post author", () => {
    render(<SinglePost post={post} />);
    const authorElement = screen.getByText("Posted by John Doe");
    expect(authorElement).toBeInTheDocument();
  });

  test("renders the post creation date", () => {
    render(<SinglePost post={post} />);
    const dateElement = screen.getByText("on January 1, 2022");
    expect(dateElement).toBeInTheDocument();
  });

  test("renders the comments section", () => {
    render(<SinglePost post={post} />);
    const commentsElement = screen.getByText("Comments");
    expect(commentsElement).toBeInTheDocument();
  });

  test("renders the comment form if user is logged in", () => {
    render(<SinglePost post={post} />);
    const commentFormElement = screen.getByLabelText("Leave a comment");
    expect(commentFormElement).toBeInTheDocument();
  });

  test("renders the login prompt if user is not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<SinglePost post={post} />);
    const loginPromptElement = screen.getByText(
      "You must be logged in to comment."
    );
    expect(loginPromptElement).toBeInTheDocument();
  });
});
