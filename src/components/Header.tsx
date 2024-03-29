import { signOut } from "next-auth/react";
import Link from "next/link";
import Logout from "./Logout";

const HeaderPage = () => {
  return (
    <header className="mx-auto w-full container px-10 sm:px-20 flex flex-col items-center">
      <h1 className="text-3xl font-semibold">Rize&apos;s Blog</h1>
      <div className="flex flex-row items-center gap-3 mt-2">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/about/teams">Our teams</Link>
        <Link href="/repos">Repositories</Link>
        <Link href="/users">Users</Link>
        <Logout />
      </div>
    </header>
  );
};

export default HeaderPage;
