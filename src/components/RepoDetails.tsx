import { Star } from "lucide-react";
import Link from "next/link";

const fetchRepoDetails = async (name: any) => {
  const res = await fetch(
    `https://api.github.com/repos/rizeenf/${name}/contents`,
    {
      next: {
        revalidate: 60 * 3, //3 minutes cache
      },
    }
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const repo = await res.json();
  return repo;
};

const RepoDetails = async ({ name }: any) => {
  const repo = await fetchRepoDetails(name);

  const filtered = repo.filter((rep: any) => rep.type == "dir");

  return (
    <div className="aspect-video max-w-5xl bg-transparent rounded p-2 hover:bg-slate-500 hover:bg-opacity-5">
      <h2 className="text-xl capitalize text-gray-600">Directories</h2>
      <ul>
        {filtered.map((item: any) => (
          <li key={item.name}>
            <Link
              className="text-blue-700 underline underline-offset-2"
              href={`/repos/${name}/${item.path}`}
            >
              {item.path}/
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoDetails;
