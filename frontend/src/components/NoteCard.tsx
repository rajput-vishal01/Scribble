import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note, setNotes }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="card hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-amber-500 block">
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
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-stone-200 transition-all duration-200 text-stone-600 hover:text-amber-600">
              <PenSquareIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-50 transition-all duration-200 text-stone-600 hover:text-red-600">
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
