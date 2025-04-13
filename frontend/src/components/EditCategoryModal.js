import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/constants";

const EditCategoryModal = ({ isOpen, onClose, category, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        imageUrl: category.imageUrl || "",
        itemsCount: category.itemsCount || 0,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "itemsCount" ? (value ? parseInt(value) : undefined) : value;

    if (newValue === "" || newValue === undefined) {
      const newFormData = { ...formData };
      delete newFormData[name];
      setFormData(newFormData);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Only send fields that have values
    const updateData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== undefined && formData[key] !== "") {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    try {
      const jwt_token = Cookies.get("jwt_token");
      const url = API_BASE_URL + "/category/" + category._id;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt_token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update category");
      }

      onSuccess({
        ...category,
        ...updateData,
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Category Name
              <span className="text-gray-400 text-sm ml-1">(optional)</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Image URL
              <span className="text-gray-400 text-sm ml-1">(optional)</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Items Count
              <span className="text-gray-400 text-sm ml-1">(optional)</span>
            </label>
            <input
              type="number"
              name="itemsCount"
              value={formData.itemsCount || ""}
              onChange={handleChange}
              min="0"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || Object.keys(formData).length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
