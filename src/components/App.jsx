import React, { useEffect, useState } from "react";
import { initNotes } from "../utils/hooks";
import { loadNotesFromServer } from "../utils/utils.js";
import { LOCALHOST } from "../utils/constants.js";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  initNotes(setNotes);

  async function addNote(newNote) {
    try {
      await axios.post(LOCALHOST + "/newNote", newNote);
      loadNotesFromServer(setNotes);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(LOCALHOST + `/notes/${id}`);
      loadNotesFromServer(setNotes);
    } catch (err) {
      console.log(err);
    }
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
