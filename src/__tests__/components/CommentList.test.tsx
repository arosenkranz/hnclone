import type { CommentWithAuthor } from "~/types";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentList, CommentListItem } from "~/components/CommentList";

describe("CommentList", () => {
  const comments: CommentWithAuthor[] = [
    {
      id: "1",
      content: "test",
      createdAt: new Date().toISOString(),
      authorId: "1",
      author: {
        id: "1",
        name: "test",
        email: "name@example.com",
      },
      _count: {
        votes: 0,
      },
    }
  ];

  it("should render a list of comments", () => {
    const { getByRole } = render(<CommentList comments={comments} />);

    expect(getByRole("list")).toBeInTheDocument();
  });

  it("should render a comment item", () => {
    const { getByRole } = render(<CommentListItem comment={comments[0]} />);

    expect(getByRole("listitem")).toBeInTheDocument();
  });

  