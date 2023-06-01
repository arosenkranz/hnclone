import { render, fireEvent } from "@testing-library/react";
import { CommentForm } from "~/components/CommentForm";

jest.mock("../../utils/api", () => ({
  api: {
    useContext: jest.fn(() => ({
      post: {
        getPostBySlug: {
          invalidate: jest.fn(),
        },
      },
    })),
    comment: {
      createComment: {
        useMutation: jest.fn(() => ({
          mutate: jest.fn(),
          isLoading: false,
        })),
      },
    },
  },
}));

describe("CommentForm", () => {
  it("should render a form with a textarea and a submit button", () => {
    const { getByRole, getByPlaceholderText } = render(
      <CommentForm postId="1" slug="test" />
    );

    expect(getByRole("form")).toBeInTheDocument();
    expect(
      getByPlaceholderText(/write your comment's content/i)
    ).toBeInTheDocument();
    expect(getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should submit the form when the submit button is clicked", () => {
    const { getByRole } = render(<CommentForm postId="1" slug="test" />);

    fireEvent.click(getByRole("button", { name: /submit/i }));
  });
});
