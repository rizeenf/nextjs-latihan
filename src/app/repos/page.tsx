import RepoLists from "@/components/RepoLists";
import { resolve } from "path";

export const fetchRepos = async () => {
  const response = await fetch("https://api.github.com/users/rizeenf/repos", {
    next: {
      revalidate: 60 * 3, //3 minutes cache
    },
  });
  const repos = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 1000)); //fake loading

  return repos;
};

const ReposPage = async () => {
  const repos = await fetchRepos();

  return (
    <div>
      <h2 className="text-2xl text-center font-semibold">Repositories</h2>
      <div className="repo-lists mt-5">
        <ul className="flex flex-row gap-2 justify-center flex-wrap max-w-4xl">
          {repos.map((repo: any) => (
            <RepoLists repo={repo} key={repo.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReposPage;
