import { Eye, GitFork, Star } from "lucide-react";
import Link from "next/link";

const RepoLists = ({ repo }: { repo: any }) => {
  return (
    <li className="aspect-video w-72 bg-transparent border border-spacing-1 rounded border-gray-400 p-2 hover:bg-slate-500 hover:bg-opacity-5">
      <Link
        href={`repos/${repo.name}`}
        className="flex flex-col justify-around h-full"
      >
        <h2 className="text-xl capitalize">{repo.name} &rarr;</h2>
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
      </Link>
    </li>
  );
};

export default RepoLists;
