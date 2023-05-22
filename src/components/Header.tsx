import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="mx-auto flex items-center justify-center">
      <div className="container flex flex-col items-center justify-between  py-6 md:flex-row">
        <Link
          href="/"
          className="border-2 border-black bg-black px-2 py-1 text-6xl font-bold text-white "
        >
          Bits of News
        </Link>
        <Auth />
      </div>
    </header>
  );
};

const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="my-2 flex flex-wrap items-center gap-4 md:my-0 md:flex-row">
      <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      <button
        className="underline"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
