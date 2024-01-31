import Repo from "@/components/Repo";
import RepoDetails from "@/components/RepoDetails";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const RepoPage = ({ params }: { params: { name: string } }) => {
  const { name } = params;
  return (
    <div className="max-w-7xl">
      <Link href={"/repos"}>&larr; Back</Link>
      <h2 className="text-2xl text-center font-semibold mt-5">{name}</h2>
      <div className="mt-5">
        <Suspense fallback={<Loader2 size={18} className="animate-spin m-2" />}>
          <Repo name={name} />
        </Suspense>
        <Suspense fallback={<Loader2 size={18} className="animate-spin m-2" />}>
          <RepoDetails name={name} />
        </Suspense>
      </div>
    </div>
  );
};

export default RepoPage;
