import { render, fireEvent, waitFor } from "@testing-library/react";
import { CommentListItem } from "~/components/CommentListItem";

// Mock the next-auth hook
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { name: "Test User", email: "name@example.com", id: "1" } },
  }),
}));

// Mock the api
jest.mock("../../utils/api", () => ({
  api: {
    useContext: jest.fn(() => ({
      comment: {
        getCommentsByPostId: {
          invalidate: jest.fn(),
        },
        hasVoted: {
          invalidate: jest.fn(),
        },
      },
    })),
    comment: {
      hasVoted: {
        useQuery: jest.fn(() => ({ data: true })),
      },
      addVote: {
        useMutation: jest.fn(() => ({ mutate: jest.fn() })),
      },
      removeVote: {
        useMutation: jest.fn(() => ({ mutate: jest.fn() })),
      },
    },
  },
}));

jest.mock("remark-gfm", () => jest.fn());

const commentMock = {
  id: "1",
  content: "Mock comment",
  postId: "1",
  authorId: "1",
  author: { name: "Mock user", email: "name@example.com", id: "1" },
  createdAt: new Date(),
  _count: { votes: 5 },
};

describe("CommentListItem", () => {
  it("renders the comment content, author name, and vote count", () => {
    const { getByText } = render(<CommentListItem comment={commentMock} />);

    expect(getByText(commentMock.content)).toBeInTheDocument();
    expect(getByText(commentMock._count.votes.toString())).toBeInTheDocument();
    expect(getByText(/by mock user/i)).toBeInTheDocument();
  });

  it("does not call addVote or removeVote mutations if user is not logged in", () => {
    const addVoteMock = jest.fn();
    const removeVoteMock = jest.fn();

    jest.mock("../../utils/api", () => ({
      api: {
        comment: {
          addVote: {
            useMutation: () => ({ mutate: addVoteMock }),
          },
          removeVote: {
            useMutation: () => ({ mutate: removeVoteMock }),
          },
        },
      },
    }));

    // Mock the next-auth hook
    jest.mock("next-auth/react", () => ({
      useSession: () => ({
        data: null,
      }),
    }));

    const { getByRole } = render(<CommentListItem comment={commentMock} />);
    fireEvent.click(getByRole("button"));

    expect(addVoteMock).not.toHaveBeenCalled();
    expect(removeVoteMock).not.toHaveBeenCalled();
  });

  it("calls addVote mutation when user clicks vote button and hasn't voted yet", async () => {
    const addVoteMock = jest.fn();

    jest.mock("../../utils/api", () => ({
      api: {
        comment: {
          hasVoted: {
            useQuery: () => ({ data: false }),
          },
          addVote: {
            useMutation: () => ({ mutate: addVoteMock }),
          },
        },
      },
    }));

    const { getByRole } = render(<CommentListItem comment={commentMock} />);
    const button = getByRole("button");
    console.log(button);
    await waitFor(() => fireEvent.click(button));

    expect(addVoteMock).toHaveBeenCalledWith({ commentId: commentMock.id });
  });

  it("calls removeVote mutation when user clicks vote button and has already voted", () => {
    const removeVoteMock = jest.fn();

    jest.mock("../../utils/api", () => ({
      api: {
        comment: {
          hasVoted: {
            useQuery: () => ({ data: true }),
          },
          removeVote: {
            useMutation: () => ({ mutate: removeVoteMock }),
          },
        },
      },
    }));

    jest.mock("next-auth/react", () => ({
      useSession: () => ({
        data: { user: { name: "Test User", email: "test@example.com" } },
      }),
    }));

    const { getByRole } = render(<CommentListItem comment={commentMock} />);
    fireEvent.click(getByRole("button"));

    expect(removeVoteMock).toHaveBeenCalledWith({ commentId: commentMock.id });
  });
});
