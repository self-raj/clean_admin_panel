import React, { useState } from "react";

function About() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const wordLimit = 120;

  const handleContentChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);

    if (words.length <= wordLimit) {
      setContent(text);
    } else {
      alert(`Content cannot exceed ${wordLimit} words!`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || !image) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);

    try {
      const res = await fetch("https://clean-backend-3.onrender.com/about", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ About content saved successfully!");
        setContent("");
        setImage(null);
      } else {
        setMessage("❌ Failed to save data.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Update About Section</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Content Input */}
        <textarea
          placeholder={`Enter content (max ${wordLimit} words)...`}
          value={content}
          onChange={handleContentChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          rows="4"
        ></textarea>
        <p className="text-sm text-gray-500">
          {content.trim().split(/\s+/).filter(Boolean).length}/{wordLimit} words
        </p>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-4 text-center ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default About;
