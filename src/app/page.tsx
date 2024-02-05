import Sections from "@/components/Sections";
import { authOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <section className="max-w-xl">
      <h1 className="text-4xl font-bold">Home page</h1>
      <Sections />
    </section>
  );
}
