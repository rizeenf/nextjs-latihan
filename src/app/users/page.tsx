import { authOptions } from "@/lib/nextAuthOptions";
import { fetchUsers } from "@/lib/utils/fetchUsers";
import { TUsersSchema } from "@/lib/validators/usersSchema";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const UsersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin");
  }

  const data = await fetchUsers();

  return (
    <div>
      <div className="w-full my-5 flex">
        <Link
          href={"/login"}
          className="p-3 rounded-lg w-full text-center text-white hover:bg-opacity-65 font-bold bg-gray-400"
        >
          Login
        </Link>
      </div>
      <div className="w-full my-5 flex">
        <Link
          href={"/register"}
          className="p-3 rounded-lg w-full text-center text-white hover:bg-opacity-65 font-bold bg-gray-400"
        >
          Register user
        </Link>
      </div>
      {data.map((item: TUsersSchema) => (
        <div
          key={item.id}
          className="flex flex-row flex-wrap gap-3 items-center"
        >
          <img src={item.avatar} alt={`${item.name} avatar`} />
          <p className="font-semibold">{item.name}</p>
          <p>{item.datas.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
