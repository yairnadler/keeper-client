import React, { useState } from "react";
import { v4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const generateID = v4();
  const [isExpanded, setIsExpended] = useState(false);
  const [id, setID] = useState(generateID);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    note["_id"] = id;
    setID(generateID);
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function expand() {
    setIsExpended(true);
  }

  return (
    <div>
      <form className="create-note">
          <input
            name="title"
            onChange={handleChange}
            onClick={expand}
            value={note.title}
            placeholder={isExpanded ? "Title" : "Take a note..."}
          />
        {isExpanded && (
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
