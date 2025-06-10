import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios.js";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/notes", { title, content });
      navigate("/");
    } catch (err) {
      setError("Failed to create note. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200 font-medium mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Notes
          </Link>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="card-elevated">
              <input
                type="text"
                placeholder="Title"
                className="w-full text-xl font-semibold bg-transparent border-none outline-none p-0 mb-4 text-primary placeholder-stone-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />

              <textarea
                placeholder="Take a note..."
                className="w-full bg-transparent border-none outline-none resize-none min-h-[300px] text-primary placeholder-stone-400 leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
              />

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-stone-200">
                <Link to="/">
                  <button
                    type="button"
                    className="btn-secondary !w-auto px-6"
                    disabled={loading}>
                    Cancel
                  </button>
                </Link>

                <button
                  type="submit"
                  className="btn-primary !w-auto px-6 flex items-center gap-2"
                  disabled={loading}>
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    "Create Note"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;