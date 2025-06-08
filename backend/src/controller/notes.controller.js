import Note from "../models/note.model.js";

export const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 }); //-1 shows the latest on top;
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id; //extracted from middleware

    const newNote = new Note({ title, content, user: userId });

    await newNote.save();
    res.status(201).json({ message: "Notes created", note: newNote });
  } catch (error) {
    console.log("Error in createNotes controller :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    // Check if note exists and user owns it
    const existingNote = await Note.findById(req.params.id);
    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (existingNote.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this note" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.log("Error in updateNotes controller :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (deletedNote.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this note" });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      noteId: req.params.id,
    });
  } catch (error) {
    console.log("Error in deleteNotes controller :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
