import React, { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";

const CategoryCard = ({ category, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video">
          <img
            src={imageError ? "/placeholder-image.jpg" : category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600">{category.itemsCount} items</p>
        </div>
      </div>

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={category}
        onSuccess={(updatedCategory) => {
          onUpdate(updatedCategory);
          setIsEditModalOpen(false);
        }}
      />
    </>
  );
};

export default CategoryCard;
