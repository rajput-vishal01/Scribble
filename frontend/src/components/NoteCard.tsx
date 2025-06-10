import { PenSquare, Trash2, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { formatDate } from "../lib/utils";
import { axiosInstance } from "../lib/axios.js";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";

const NoteCard = ({ note, setNotes }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete note:", err);
      setShowDeleteModal(false);
      setShowErrorModal(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        to={`/note/${note._id}`}
        className="card hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-amber-500 block masonry-item">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">
            {note.title}
          </h3>
          <p className="text-secondary line-clamp-3 mb-4">{note.content}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-50 transition-all duration-200 text-stone-600 hover:text-red-600"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteModal(true);
                }}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          title="Delete Note"
          message={`Are you sure you want to delete "${note.title}"? This action cannot be undone.`}
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          isProcessing={isDeleting}
        />
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <DeleteConfirmationModal
          title="Delete Note"
          message={`Are you sure you want to delete "${note.title}"? This action cannot be undone.`}
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          isProcessing={isDeleting}
        />
      )}
    </>
  );
};

export default NoteCard;
