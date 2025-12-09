import React, { createContext, useContext, useState } from 'react';
const UIContext = createContext();
export function useUI(){ return useContext(UIContext); }

export default function UIProvider({ children }){
  const [toast, setToast] = useState(null);
  function showToast(t){ setToast(t); setTimeout(()=>setToast(null), 3500); }
  return <UIContext.Provider value={{ toast, showToast }}>{children}</UIContext.Provider>
}
