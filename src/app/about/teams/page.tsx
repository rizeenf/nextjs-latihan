import { authOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const TeamsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <section className="max-w-xl text-justify">
      <div>
        <h2 className="text-4xl font-bold">Meet the Team</h2>
        <p className="text-gray-600 mt-5">
          Welcome to the heart of rizkin.my.id! Our team is a passionate group
          of individuals dedicated to bringing your digital ideas to life. Each
          member brings a unique set of skills and expertise, making us a
          powerhouse in the world of frontend development.
        </p>
      </div>
      <div>
        <h4 className="text-2xl font-semibold mt-10">Rizki N</h4>
        <p className="text-gray-600">
          Founder & Lead Frontend Developer . <br />
          Your brief introduction here. Talk about your passion for frontend
          development and what inspired you to create rizkin.my.id.
        </p>
      </div>
      <div>
        <h4 className="text-2xl font-semibold mt-10">R Nurpadilah</h4>
        <p className="text-gray-600">
          Role: UI/UX Designer <br />
          Team member&apos;s introduction. Share a bit about their background,
          expertise, and what they bring to the team.
        </p>
      </div>
    </section>
  );
};

export default TeamsPage;
