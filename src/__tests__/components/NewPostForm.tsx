import { render, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import NewPostForm from "~/components/NewPostForm";

// Mocks
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

const mutateMock = jest.fn();

jest.mock("../../utils/api", () => ({
  api: {
    post: {
      createPost: {
        useMutation: jest.fn(() => ({
          mutate: mutateMock,
        })),
      },
    },
  },
}));

jest.mock("next/dynamic", () => () => {
  const MockedEditor = ({ value, onChange }) => (
    <textarea
      data-testid="md-editor"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
  return MockedEditor;
});

describe("NewPostForm", () => {
  it("submits the form with the input values", async () => {
    const { api } = require("../../utils/api");
    const push = jest.fn();
    const mutate = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push });
    (api.post.createPost.useMutation as jest.Mock).mockReturnValue([
      { mutate },
      {},
    ]);

    const { getByLabelText, getByRole, getByTestId } = render(<NewPostForm />);

    // Simulate user input
    fireEvent.change(getByLabelText("Title"), {
      target: { value: "Test title" },
    });
    fireEvent.change(getByTestId("md-editor"), {
      target: { value: "Test content" },
    });

    // Submit the form
    fireEvent.click(getByRole("button", { name: /submit/i }));

    // Wait for promises to resolve
    await waitFor(() => {
      expect(mutate).toHaveBeenCalled();

      expect(push).toHaveBeenCalledWith("/posts/test-title");
    });
  });

  it("does not submit the form if the input values are empty", async () => {
    const { api } = require("../../utils/api");
    const mutate = jest.fn();

    (api.post.createPost.useMutation as jest.Mock).mockReturnValue([
      { mutate },
      {},
    ]);

    const { getByRole } = render(<NewPostForm />);

    // Submit the form
    fireEvent.click(getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mutate).not.toHaveBeenCalled();
    });
  });
});
