import React, { createContext, useContext, useState } from "react";

const UICtx = createContext();

export function useUI() {
  return useContext(UICtx);
}

export default function UIProvider({ children }) {
  const [toast, setToast] = useState(null);

  return (
    <UICtx.Provider value={{ toast, setToast }}>
      {children}
    </UICtx.Provider>
  );
}
