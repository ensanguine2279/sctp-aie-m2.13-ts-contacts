import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "./contexts/AuthContext";

import App from "./App.tsx";
import { ContactsProvider } from "./contexts/ContactsContext.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <AuthProvider>
      <ContactsProvider>
        <App />
      </ContactsProvider>
    </AuthProvider>
  </StrictMode>,
);
