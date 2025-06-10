import { ArrowLeft, PenSquare, Trash2, X, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios.js";
import { formatDate } from "../lib/utils";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.jsx";

const DetailNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Editing states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  
  // Refs for auto-focus
  const titleInputRef = useRef(null);
  const contentTextareaRef = useRef(null);
  
  // Auto-save timeout
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosInstance.get(`/notes/${id}`);
        setNote(response.data.note);
        setEditedTitle(response.data.note.title);
        setEditedContent(response.data.note.content);
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setError("Failed to load note. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  // Auto-save function
  const autoSave = async (newTitle, newContent) => {
    if (!note || (newTitle === note.title && newContent === note.content)) {
      return; // No changes to save
    }

    setIsSaving(true);
    setSaveStatus("saving");

    try {
      const response = await axiosInstance.put(`/notes/${id}`, {
        title: newTitle.trim() || "Untitled",
        content: newContent
      });

      // Update the note state with the response
      setNote(response.data.note || { ...note, title: newTitle, content: newContent, updatedAt: new Date().toISOString() });
      setSaveStatus("saved");
      
      // Clear saved status after 2 seconds
      setTimeout(() => setSaveStatus(""), 2000);
    } catch (err) {
      console.error("Failed to save note:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced save function
  const debouncedSave = (newTitle, newContent) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      autoSave(newTitle, newContent);
    }, 1000);
  };


  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setEditedTitle(newTitle);
    debouncedSave(newTitle, editedContent);
  };


  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setEditedContent(newContent);
    debouncedSave(editedTitle, newContent);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };


  const startEditingTitle = () => {
    setIsEditingTitle(true);
    setTimeout(() => titleInputRef.current?.focus(), 0);
  };

  const finishEditingTitle = () => {
    setIsEditingTitle(false);
    // Trigger immediate save if there are pending changes
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      autoSave(editedTitle, editedContent);
    }
  };

  const startEditingContent = () => {
    setIsEditingContent(true);
    setTimeout(() => {
      if (contentTextareaRef.current) {
        contentTextareaRef.current.focus();
        // Set cursor to end
        const textarea = contentTextareaRef.current;
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 0);
  };

  const finishEditingContent = () => {
    setIsEditingContent(false);
    // Trigger immediate save if there are pending changes
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      autoSave(editedTitle, editedContent);
    }
  };

  // Handle key presses
  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finishEditingTitle();
    }
    if (e.key === 'Escape') {
      setEditedTitle(note.title);
      finishEditingTitle();
    }
  };

  const handleContentKeyPress = (e) => {
    if (e.key === 'Escape') {
      setEditedContent(note.content);
      finishEditingContent();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/notes/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete note:", err);
      setShowDeleteModal(false);
      setShowErrorModal(true);
    } finally {
      setIsDeleting(false);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-app">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="card animate-pulse">
              <div className="h-8 bg-stone-200 rounded mb-4"></div>
              <div className="h-4 bg-stone-200 rounded mb-2"></div>
              <div className="h-4 bg-stone-200 rounded mb-2"></div>
              <div className="h-4 bg-stone-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-app">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200 font-medium mb-6">
              <ArrowLeft className="w-5 h-5" />
              Back to Notes
            </Link>
            <div className="card text-center">
              <div className="text-red-600 text-xl font-semibold mb-2">
                Error
              </div>
              <p className="text-secondary mb-4">{error}</p>
              <Link to="/" className="btn-primary !w-auto px-6">
                Go Back to Notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-app">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200 font-medium mb-6">
              <ArrowLeft className="w-5 h-5" />
              Back to Notes
            </Link>
            <div className="card text-center">
              <div className="text-primary text-xl font-semibold mb-2">
                Note Not Found
              </div>
              <p className="text-secondary mb-4">
                The note you're looking for doesn't exist or has been deleted.
              </p>
              <Link to="/" className="btn-primary !w-auto px-6">
                Go Back to Notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-app">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header with navigation and actions */}
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200 font-medium">
                <ArrowLeft className="w-5 h-5" />
                Back to Notes
              </Link>

              <div className="flex items-center gap-3">
                {/* Save status indicator */}
                {saveStatus && (
                  <div className="flex items-center gap-2 text-sm">
                    {saveStatus === "saving" && (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-blue-600">Saving...</span>
                      </>
                    )}
                    {saveStatus === "saved" && (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Saved</span>
                      </>
                    )}
                    {saveStatus === "error" && (
                      <span className="text-red-600">Failed to save</span>
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="btn-primary !w-auto px-4 py-2 !bg-gradient-to-r !from-red-600 !to-red-700 hover:!from-red-700 hover:!to-red-800 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>

            {/* Note content */}
            <article className="card">
              {/* Note header */}
              <header className="mb-6 pb-4 border-b border-stone-200">
                {/* Editable Title */}
                {isEditingTitle ? (
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={editedTitle}
                    onChange={handleTitleChange}
                    onBlur={finishEditingTitle}
                    onKeyDown={handleTitleKeyPress}
                    className="text-3xl font-bold text-primary mb-3 w-full bg-transparent border-none outline-none focus:bg-stone-50 rounded px-2 py-1 -mx-2"
                    placeholder="Note title..."
                  />
                ) : (
                  <h1 
                    className="text-3xl font-bold text-primary mb-3 cursor-text hover:bg-stone-50 rounded px-2 py-1 -mx-2 transition-colors"
                    onClick={startEditingTitle}
                  >
                    {editedTitle || "Untitled"}
                  </h1>
                )}
                
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span>Created {formatDate(new Date(note.createdAt))}</span>
                  {note.updatedAt && note.updatedAt !== note.createdAt && (
                    <span>
                      • Updated {formatDate(new Date(note.updatedAt))}
                    </span>
                  )}
                </div>
              </header>

              {/* Editable Content */}
              {isEditingContent ? (
                <textarea
                  ref={contentTextareaRef}
                  value={editedContent}
                  onChange={handleContentChange}
                  onBlur={finishEditingContent}
                  onKeyDown={handleContentKeyPress}
                  className="w-full text-primary leading-relaxed text-base bg-transparent border-none outline-none focus:bg-stone-50 rounded p-2 -m-2 resize-none overflow-hidden"
                  placeholder="Start writing your note..."
                  style={{ minHeight: '200px' }}
                />
              ) : (
                <div 
                  className="text-primary leading-relaxed whitespace-pre-wrap text-base cursor-text hover:bg-stone-50 rounded p-2 -m-2 transition-colors min-h-[200px]"
                  onClick={startEditingContent}
                >
                  {editedContent || "Click to start writing..."}
                </div>
              )}
            </article>
          </div>
        </div>
      </div>

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card-elevated max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-600">Error</h3>
              <button
                onClick={() => setShowErrorModal(false)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-stone-200 transition-all duration-200 text-stone-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-secondary mb-6">
              Failed to delete the note. Please check your connection and try
              again.
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="btn-primary !w-auto px-6">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailNote;