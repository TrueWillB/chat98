import { createContext, useState } from "react";

export const SelectedFriendContext = createContext();

export const SelectedFriendProvider = ({ children }) => {
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  return (
    <SelectedFriendContext.Provider
      value={{ selectedFriendId, setSelectedFriendId }}
    >
      {children}
    </SelectedFriendContext.Provider>
  );
};
