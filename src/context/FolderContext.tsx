import { createContext, useContext, useMemo, useState } from "react";
import { FolderContextType, HttpItem } from "../types";

const initialState: FolderContextType = {
  currentFolder: "",
  setCurrentFolder: () => {},
  currentEndpoint: null,
  setCurrentEndpoint: () => {},
};

const FolderContext = createContext<FolderContextType>(initialState);

export const FolderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentFolder, setCurrentFolder] = useState<string>("");
  const [currentEndpoint, setCurrentEndpoint] = useState<HttpItem | null>(null);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      currentFolder,
      setCurrentFolder,
      currentEndpoint,
      setCurrentEndpoint,
    }),
    [currentFolder, currentEndpoint]
  );

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};

export const useCurrentFolder = (): FolderContextType => {
  const context = useContext(FolderContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentFolder must be used within a CurrentFolderProvider"
    );
  }
  return context;
};
