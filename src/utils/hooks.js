import React, { useEffect, useState } from "react";
import { loadNotesFromServer } from "./utils.js";

export function initNotes(setNotes) {
  useEffect(() => {
    loadNotesFromServer(setNotes);
  }, []);
}
