import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // ✅ Load from localStorage on first render
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem("appState");
   
    return saved ? JSON.parse(saved) : { position: [[]], turn: "", dropped: [], winner: null };
  });

  // ✅ Save to localStorage whenever appState changes
  useEffect(() => {
     
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default AppContext;
