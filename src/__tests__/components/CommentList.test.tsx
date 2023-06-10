import { render } from "@testing-library/react";
import { CommentList } from "~/components/CommentList";

jest.mock("../../components/CommentListItem", () =>
  jest.fn(() => <li>Mocked Comment</li>)
);

jest.mock("../../utils/api", () => ({
  api: {
    comment: {
      getCommentsByPostId: {
        useQuery: jest.fn(() => ({
          data: [
            {
              id: "1",
              content: "Test Content",
              author: { name: "Test Author" },
              _count: { votes: 10 },
              createdAt: new Date(),
            },
            {
              id: "2",
              content: "Test Content 2",
              author: { name: "Test Author 2" },
              _count: { votes: 20 },
              createdAt: new Date(),
            },
          ],
        })),
      },
    },
  },
}));

describe("CommentList", () => {
  it("renders a list of comments", () => {
    const { getAllByText } = render(<CommentList postId="2" />);

    expect(getAllByText("Mocked Comment")).toHaveLength(2);
  });

  it("renders no comments when there are no comments", () => {
    const { queryAllByText } = render(<CommentList postId="1" />);

    expect(queryAllByText("Mocked Comment")).toBeNull();
  });

  it("renders loading state", () => {
    // update the mock to simulate loading state
    jest.mock("../../utils/api", () => ({
      api: {
        comment: {
          getCommentsByPostId: {
            useQuery: () => ({ isLoading: true, data: null }),
          },
        },
      },
    }));

    const { getByText } = render(<CommentList postId="1" />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
