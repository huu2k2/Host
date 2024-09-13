import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { IoSearch } from "react-icons/io5";



export const InputSearch = ({ callback }) => {
  const [search, setSearch] = useState("");



  const updateInputValue = (val) => {
    // applySearch(val);
    setSearch(val);
    callback(val);
  };

  return (
    <div className="relative mr-5 h-[35px]">
      <div className="absolute ml-2 inset-y-0 flex items-center ">
        <IoSearch />
      </div>
      <input
        value={search}
        onChange={(e) => updateInputValue(e.target.value)}
        type="search"
        id="default-search"
        className="p-2 pl-7 w-80 focus:outline-none focus-visible:border-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-none "
        placeholder="Tìm kiếm mã phòng..."
      />
    </div>
  );
};
