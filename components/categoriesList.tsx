import React from "react";
import Link from "next/link";
import { Categories } from "@/data/data";

const CategoriesList = () => {
  return (
    <div className="flex items-center flex-wrap gap-4 p-1 md:p-0 md:space-x-6 ">
      <Link
        href={`/`}
        className="border p-2 rounded-lg hover:bg-white hover:text-darkBlue transition-all">
        All
      </Link>
      {Categories &&
        Categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.title}`}
            className="border p-2 rounded-lg hover:bg-white hover:text-darkBlue transition-all text-base md:text-xl">
            {category.title}
          </Link>
        ))}
    </div>
  );
};

export default CategoriesList;
