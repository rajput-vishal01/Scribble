import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { axiosInstance } from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound.jsx";
import NoteCard from "../components/NoteCard.js";
import LoadingComponent from "../components/Loading.jsx";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes/");
        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching Notes:", error.message);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <div>
        {loading && (
          <div className="text-center text-primary">
            <LoadingComponent />
          </div>
        )}
        <Navbar />
        {notes.length === 0 && <NotesNotFound />}

        {notes.length > 0 && (
          <div className="masonry-layout">
            {notes.map((note) => (
              <div key={note._id} className="masonry-item">
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
