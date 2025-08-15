import React from "react";

const UpdateCategory = ({ isOpen, onClose, editData, setEditData, onSave, fixedCategories }) => {
  if (!isOpen) return null; // Modal hidden when isOpen is false

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-4">✏ Edit Item</h2>

        {/* Category */}
        <label className="block font-medium mb-1">Category</label>
        <select
          value={editData.categoryName}
          onChange={(e) => setEditData({ ...editData, categoryName: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        >
          {fixedCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Item */}
        <label className="block font-medium mb-1">Item Name</label>
        <input
          type="text"
          value={editData.item}
          onChange={(e) => setEditData({ ...editData, item: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />

        {/* Price */}
        <label className="block font-medium mb-1">Price</label>
        <input
          type="text"
          value={editData.price}
          onChange={(e) => setEditData({ ...editData, price: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
