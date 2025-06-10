import { X } from "lucide-react";

const DeleteConfirmationModal = ({
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  isOpen,
  onClose,
  onConfirm,
  isProcessing = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card-elevated max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-stone-200 transition-all duration-200 text-stone-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-secondary mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="btn-secondary !w-auto px-6"
            disabled={isProcessing}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-primary !w-auto px-6 !bg-gradient-to-r !from-red-600 !to-red-700 hover:!from-red-700 hover:!to-red-800 flex items-center gap-2"
            disabled={isProcessing}>
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
