import React from "react";
import Link from "next/link";
// import { Categories } from "@/data/data";
import { TCategories } from "@/types/types";

const getCategories = async (): Promise<TCategories[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/`);

    if (res.ok) {
      const categories = await res.json();
      console.log(categories, "categories");
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const CategoriesList = async () => {
  const Categories = await getCategories();
  console.log(Categories);
  return (
    <div className="flex items-center flex-wrap gap-4 p-1 md:p-0 md:space-x-6 ">
      {/* <Link
        href={`/`}
        className="border p-2 rounded-lg hover:bg-white hover:text-darkBlue transition-all">
        All
      </Link> */}
      {Categories &&
        Categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.catName}`}
            className="border p-2 rounded-lg hover:bg-white hover:text-darkBlue transition-all text-base md:text-xl">
            {category.catName}
          </Link>
        ))}
    </div>
  );
};

export default CategoriesList;
