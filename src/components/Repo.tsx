import { Eye, GitFork, Star } from "lucide-react";

const fetchRepo = async (name: any) => {
  const res = await fetch(`https://api.github.com/repos/rizeenf/${name}`, {
    next: {
      revalidate: 60 * 3, //3 minutes cache
    },
  });
  const repo = await res.json();
  return repo;
};

const Repo = async ({ name }: any) => {
  const repo = await fetchRepo(name);

  return (
    <div className="w-72 bg-transparent rounded p-2 hover:bg-slate-500 hover:bg-opacity-5">
      <h2 className="text-xs capitalize text-gray-600">{repo.description}</h2>
      <div className="flex flex-row justify-around items-end">
        <div className="flex flex-row gap-2 items-center">
          <Star size={16} /> <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <GitFork size={16} /> <span>{repo.forks_count}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Eye size={16} /> <span>{repo.watchers_count}</span>
        </div>
      </div>
    </div>
  );
};

export default Repo;
