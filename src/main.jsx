import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { ThemeProvider } from "./context/ThemeContext.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/lms-instructor-portal/firebase-messaging-sw.js")
    .then()
    .catch((err) => {
      console.error("Service Worker registration failed:", err);
    });
}
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
  // </StrictMode>
);
