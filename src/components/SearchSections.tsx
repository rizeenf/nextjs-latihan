import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

const SearchSections = ({ getSearchResults }: any) => {
  const [q, SetQ] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sections?q=${q}`
    );

    if (!res.ok) {
      throw new Error("Error while fetching");
    }

    const datas = await res.json();

    getSearchResults(datas);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 flex-row w-full justify-evenly"
    >
      <input
        type="text"
        placeholder="Search .."
        value={q}
        onChange={(e) => SetQ(e.target.value)}
        className="rounded-sm bg-transparent p-2 border-b border-b-gray-500 outline-none w-full"
      />
      <button type="submit" className="bg-gray-400 p-3 mx-3 rounded-md">
        <Search size={16} className="text-white" />
      </button>
    </form>
  );
};

export default SearchSections;
