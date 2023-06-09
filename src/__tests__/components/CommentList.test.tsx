import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentList, CommentListItem } from "~/components/CommentList";
import { CommentWithAuthor } from "~/types";

describe("CommentList", () => {
  const postId = "1";

  it("should render a list of comments", () => {
    const { getByRole } = render(<CommentList postId={postId} />);

    expect(getByRole("list")).toBeInTheDocument();
  });

  it("should render a comment item", () => {
    const data: CommentWithAuthor = {
      id: "1",
      content: "test",
      createdAt: new Date(),
      postId: "1",
      authorId: "1",
      author: {
        id: "1",
        name: "test",
        email: "name@example.com",
      },
      _count: {
        votes: 0,
      },
    };

    const { getByRole } = render(<CommentListItem comment={data} />);

    expect(getByRole("listitem")).toBeInTheDocument();
  });
});
