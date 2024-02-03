import AppRoutes from "@routes/appRoutes";
import "./App.css";
import Provider from "./providers";
import { useEffect, createContext } from "react";

export const AuthContext = createContext({ isLoggedIn: false });

function App() {
  useEffect(() => {}, []);
  return (
    <AuthContext.Provider value={{ AuthContext, hello: "hello" }}>
      <Provider>
        <AppRoutes />
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
