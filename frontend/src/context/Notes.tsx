import React, { createContext, useContext, useState } from "react";

export interface NoteInterface {
  title: string;
  description: string;
  _id?: string;
  bgColor?: string;
}

export interface NotesInterface {
  notes: NoteInterface[];
  setNotes: (note: NoteInterface[]) => void;
}

interface NotesProviderInterface {
  children: React.ReactNode;
}

const dummyObject: NotesInterface = {
  notes: [],
  setNotes: () => {},
};

const NotesContext = createContext<NotesInterface>(dummyObject);

export function NotesProvider({ children }: NotesProviderInterface) {
  const [notes, setNotes] = useState<NoteInterface[]>([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
