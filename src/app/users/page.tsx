import { TUsersSchema } from "@/utils/usersSchema";
import Link from "next/link";

const fetchUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  const data = await res.json();

  return data;
};

const UsersPage = async () => {
  const data = await fetchUsers();

  console.log({ data });
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
