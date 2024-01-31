"use client";
import Loading from "@/app/loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchSections from "./SearchSections";

const Sections = () => {
  const [datas, setDatas] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/sections");

      if (!res.ok) {
        throw new Error("Error while fetching");
      }

      setIsLoading(false);
      return setDatas(await res.json());
    };
    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-5 w-full">
      <SearchSections getSearchResults={(datas: any) => setDatas(datas)} />
      {datas.map((data: any) => (
        <section
          key={data.id}
          className="border p-5 m-1 rounded hover:bg-gray-700 hover:bg-opacity-5"
        >
          <Link href={data.link} target="_blank">
            <h1 className="text-xl font-semibold">{data.title} &rarr;</h1>
            <p className="text-gray-600 mb-2">{data.description}</p>
            <span className="p-1 px-2 bg-gray-700 rounded-sm bg-opacity-5">
              {data.level}
            </span>
          </Link>
        </section>
      ))}
    </div>
  );
};

export default Sections;
