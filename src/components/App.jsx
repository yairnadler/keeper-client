import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  async function addNote(newNote) {
    await axios
      .post("http://localhost:3000/newNote", newNote)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  async function deleteNote(id) {
    await axios.delete(`http://localhost:3000/notes/${id}`);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
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
