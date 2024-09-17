import axios from "axios";

// Load notes from DB.
export async function loadNotesFromServer(setNotes) {
  try {
    const serverNotes = await axios.get("http://localhost:3000/getNotes");
    // console.log(serverNotes.data);
    setNotes(serverNotes.data);
  } catch (err) {
    console.log(err.message);
  }
}