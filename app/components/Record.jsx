"use client";

import { useEffect, useState } from "react";

const Record = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchAllGames = async () => {
    try {
      const response = await fetch(
        `/api/rgbet/all?page=${page}&limit=${limit}`,
        { method: "GET" }
      );
      const data = await response.json();

      if (response.ok) {
        setGames(data);
      } else {
        toast.error(data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchAllGames();
  }, [page, limit]);

  return (
    <div className="relative p-4">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-blue-200">
          <tr>
            <th scope="col" className="px-3 py-3">
              Period
            </th>
            <th scope="col" className="px-3 py-3">
              Price
            </th>
            <th scope="col" className="px-3 py-3">
              Number
            </th>
            <th scope="col" className="px-3 py-3">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {games.map((item, i) => (
            <tr key={i} className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap "
              >
                {item?.gameCount}
              </th>
              <td className="px-6 py-4">{32345}</td>
              <td className="px-6 py-4">
                {item?.result ? item?.result : "waiting..."}
              </td>
              <td className={`px-6 py-4`}>
                {item?.result == 5 || item?.result == 0 ? (
                  <div className="p-2 bg-blue-500 rounded-full w-2 h-2" />
                ) : item?.result % 2 == 0 ? (
                  <div className="p-2 bg-green-500 rounded-full w-2 h-2" />
                ) : (
                  <div className="p-2 bg-red-500 rounded-full w-2 h-2" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handlePrevPage}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Record;
