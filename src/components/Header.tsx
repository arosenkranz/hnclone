import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex items-center justify-between py-6">
        <h1 className="sm:text-[5rem] text-5xl font-extrabold tracking-tight text-white">
          Bits of News
        </h1>
        <AuthShowcase />
      </div>
    </header>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.user.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="hover:bg-white/20 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
