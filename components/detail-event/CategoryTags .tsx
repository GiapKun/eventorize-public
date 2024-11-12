import React from "react";

interface CategoryTagsProps {
  categories: string[];
}

const CategoryTags: React.FC<CategoryTagsProps> = ({ categories }) => {
  return (
    <div className="category-tags mt-4">
      <div className="font-bold text-lg sm:text-xl mb-4">Category</div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <span
            key={index}
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gray-300 text-gray-700 font-semibold text-xs sm:text-sm"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryTags;
