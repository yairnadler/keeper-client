import axios from "axios";
import { LOCALHOST } from "./constants.js";

// Load notes from server
export async function loadNotesFromServer(setNotes) {
  try {
    const serverNotes = await axios.get(LOCALHOST + "/notes");
    setNotes(serverNotes.data);
  } catch (err) {
    console.log(err.message);
  }
}