import React, { createContext, useContext, useState } from "react";

export interface TrashNoteInterface {
  title: string;
  description: string;
  _id?: string;
  bgColor?: string;
}

export interface TrashNotesInterface {
  notes: TrashNoteInterface[];
  setNotes: (note: TrashNoteInterface[]) => void;
}

interface NotesProviderInterface {
  children: React.ReactNode;
}

const dummyObject: TrashNotesInterface = {
  notes: [],
  setNotes: () => {},
};

const NotesContext = createContext<TrashNotesInterface>(dummyObject);

export function NotesProvider({ children }: NotesProviderInterface) {
  const [notes, setNotes] = useState<TrashNoteInterface[]>([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
