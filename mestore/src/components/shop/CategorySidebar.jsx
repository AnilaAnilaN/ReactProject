import React from "react";
import "./CategorySidebar.css";

export default function CategorySidebar({ selectedCategory, onSelectCategory }) {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Grocery",
    "Home & Living",
  ];

  return (
    <div className="category-sidebar">
      <h3>Categories</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
