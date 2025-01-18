import React from "react";
import Link from "next/link";
import { Categories } from "@/data/data";

const CategoriesList = () => {
  return (
    <div className="flex items-center space-x-6 ">
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
            className="border p-2 rounded-lg hover:bg-white hover:text-darkBlue transition-all">
            {category.title}
          </Link>
        ))}
    </div>
  );
};

export default CategoriesList;
