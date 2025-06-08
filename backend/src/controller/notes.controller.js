export const getAllNotes = async (req, res) => {
  res.status(200).json({ message: "fetched notes" });
};

export const createNotes = async (req, res) => {
  res.status(201).json({ message: "notes created " });
};

export const updateNotes = async (req, res) => {
  res.status(200).json({ message: "notes updated" });
};

export const deleteNotes = async (req, res) => {
  res.status(200).json({ message: "notes deleted" });
};
