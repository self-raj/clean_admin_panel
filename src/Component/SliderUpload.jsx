import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SliderUpload = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 10) {
      alert("You can upload a maximum of 10 images only.");
      return;
    }

    setFiles(selectedFiles);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length < 1) {
      setError("Please upload at least 1 image.");
      return;
    }

    if (files.length > 10) {
      setError("You cannot upload more than 10 images.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post(
        "https://clean-backend-3.onrender.com/slider",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        setMessage("Images uploaded successfully!");
        setFiles([]);
      } else {
        setError(res.data.message || "Upload failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Upload Slider Images
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 border p-3 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
          />

          {files.length > 0 && (
            <p className="text-sm text-gray-600">
              Selected {files.length} image{files.length > 1 && "s"}
            </p>
          )}

          {error && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-500 text-sm bg-green-100 p-2 rounded ">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
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
            {loading ? "Uploading..." : "Upload Images"}
          </button>
        </form>
        <button
          onClick={() => navigate("/all-images")}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mt-3"
        >
          View all image
        </button>
      </div>
    </div>
  );
};

export default SliderUpload;
