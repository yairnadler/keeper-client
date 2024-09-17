import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  // Load notes from DB.
  async function loadNotesFromServer() {
    try {
      const serverNotes = await axios.get("http://localhost:3000/getNotes");
      // console.log(serverNotes.data);
      setNotes(serverNotes.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    loadNotesFromServer();
  }, []);

  async function addNote(newNote) {
    await axios
      .post("http://localhost:3000/newNote", newNote)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    loadNotesFromServer();
  }

  async function deleteNote(id) {
    await axios.delete(`http://localhost:3000/notes/${id}`);
    loadNotesFromServer();
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
