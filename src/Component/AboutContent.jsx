import  { useState, useMemo } from "react";

export default function AboutContent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  // Word Count
  const wordCount = useMemo(() => {
    const trimmed = content.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [content]);

  const isOverLimit = wordCount > 120;
  const isDisabled = loading || !title.trim() || !content.trim() || isOverLimit;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // All fields required
    if (!title.trim() || !content.trim()) {
      setNotice({ type: "error", text: "All fields are required." });
      return;
    }

    // 120 word limit
    if (isOverLimit) {
      window.alert(`Content limit exceeded: ${wordCount}/120 words`);
      return;
    }

    setLoading(true);
    setNotice({ type: "", text: "" });

    try {
      const res = await fetch("https://clean-backend-3.onrender.com/about/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (data?.success) {
        setNotice({ type: "success", text: "Content saved successfully!" });
        setTitle("");
        setContent("");
      } else {
        setNotice({
          type: "error",
          text: data?.message || "Failed to save content.",
        });
      }
    } catch (err) {
      setNotice({ type: "error", text: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Update About Content
            </h2>
            
          </div>

          {/* Notice */}
          {notice.text && (
            <div
              className={`mb-5 rounded-xl px-4 py-3 border ${
                notice.type === "success"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {notice.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Company / Section Title"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Content <span className="text-rose-500">*</span>
                </label>
                <span
                  className={`text-xs font-medium ${
                    isOverLimit ? "text-rose-600" : "text-slate-500"
                  }`}
                >
                  {wordCount}/120 words
                </span>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your about content (max 120 words)…"
                rows={6}
                className={`w-full rounded-xl border px-4 py-3 outline-none transition bg-white
                  ${
                    isOverLimit
                      ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                      : "border-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  }`}
              />
              {isOverLimit && (
                <p className="mt-1 text-xs text-rose-600">
                  Limit exceeded. Please keep content within 120 words.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isDisabled}
                className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-white font-semibold shadow-lg transition
                  ${
                    isDisabled
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
                  }`}
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                )}
                {loading ? "Saving…" : "Save Content"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setContent("");
                  setNotice({ type: "", text: "" });
                }}
                className="rounded-xl px-5 py-3 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Guidelines */}
          <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
            <p className="font-semibold mb-1">Guidelines</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>All fields are required.</li>
              <li>Content must be ≤ 120 words.</li>
                <li>Title should be concise and relevant.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
