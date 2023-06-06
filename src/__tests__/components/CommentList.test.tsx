import type { CommentWithAuthor } from "~/types";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentList, CommentListItem } from "~/components/CommentList";

test("renders the vote button with the correct initial state", () => {
  const comment: CommentWithAuthor = {
    id: "1",
    content: "test",
    createdAt: new Date(),
    postId: "1",
    authorId: "1",
    _count: {
      votes: 0,
    },
  };
  render(<CommentListItem comment={comment} />);

  const voteButton = screen.getByRole("button", { name: /vote/i });
  expect(voteButton).toBeInTheDocument();
  expect(voteButton).toHaveAttribute("aria-label", "Add vote");
});
