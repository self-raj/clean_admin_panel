import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";;

const Pricing = () => {
    const Navigate = useNavigate();
  // Fixed categories
  const fixedCategories = [
    "DRY CLEAN (MEN)",
    "DRY CLEAN (WOMEN)",
    "POLISHING",
    "DRY CLEAN (KIDS)",
    "HOUSE HOLD",
    "LAUNDRY",
    "DRY CLEAN WHITE CLOTHS",
  ];

  const [categoryName, setCategoryName] = useState("");
  const [items, setItems] = useState([{ item: "", price: "" }]);

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItemRow = () => setItems([...items, { item: "", price: "" }]);
  const removeItemRow = (i) => setItems(items.filter((_, idx) => idx !== i));

  // Submit data
  const handleSave = () => {
    if (!categoryName || items.length === 0 || items.some((i) => !i.item || !i.price)) {
      alert("Please fill all fields before saving.");
      return;
    }
    axios
      .post("https://clean-backend-3.onrender.com/api/pricing", { categoryName, items })
      .then((res) => {
        alert(res.data.message);
        setCategoryName("");
        setItems([{ item: "", price: "" }]);
      })
      .catch(() => alert("Error saving data"));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🛠 Admin Panel – Pricing Management
      </h2>

      {/* Category Select */}
      <label className="block font-semibold mb-2">Select Category</label>
      <select
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        value={categoryName}
        onChange={handleCategoryChange}
      >
        <option value="">-- Select --</option>
        {fixedCategories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Items */}
      <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-700 flex items-center">
        📋 Items
      </h3>
      {items.map((row, index) => (
        <div key={index} className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder="Item name"
            value={row.item}
            onChange={(e) => handleItemChange(index, "item", e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Price"
            value={row.price}
            onChange={(e) => handleItemChange(index, "price", e.target.value)}
            className="w-32 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
          {items.length > 1 && (
            <button
              onClick={() => removeItemRow(index)}
              className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
            >
              ❌
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addItemRow}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
      >
        ➕ Add More Item
      </button>

      <button
        onClick={handleSave}
        className="bg-green-600 w-full text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        💾 Save Category & Items
      </button>
      <button
  onClick={() => Navigate("/categories")}
  className="bg-purple-600 w-full text-white px-4 py-2 rounded-lg hover:bg-purple-700 mt-3"
>
  📂 View All Categories
</button>
    </div>
  );
};

export default Pricing;
