import Head from "next/head";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

interface MainLayoutProps {
  pageTitle: string;
  description: string;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  pageTitle,
  description,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle && `${pageTitle} | `} Bits of News</title>
        <meta name="description" content={description || ""} />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <div className="mx-auto min-h-screen max-w-4xl flex-col items-center justify-center">
        <Header />
        <main className="mb-5">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
