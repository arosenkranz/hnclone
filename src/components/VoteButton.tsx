type IVoteButtonProps = {
  voteType: "up" | "down";
  disabled?: boolean;
  onClick: () => void;
};

const UpArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);

const DownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export const VoteButton: React.FC<IVoteButtonProps> = ({
  voteType,
  disabled,
  onClick,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {voteType === "up" ? <UpArrow /> : <DownArrow />}
    </button>
  );
};

export default VoteButton;
