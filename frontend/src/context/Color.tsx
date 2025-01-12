import React, { createContext, useContext, useEffect, useState } from "react";

interface ColorInterface {
  children: React.ReactNode;
}

interface ColorContextInterface {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const dummyObject = {
  color: "whitesmoke",
  setColor: () => {},
};

const ColorContext = createContext<ColorContextInterface>(dummyObject);

export function ColorProvider({ children }: ColorInterface) {
  const [color, setColor] = useState<string>("whitesmoke");

  useEffect(() => {
    const bgColor: string | null  = localStorage.getItem("color");
    if(bgColor) setColor(bgColor);
  }, []);

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  return useContext(ColorContext);
}
