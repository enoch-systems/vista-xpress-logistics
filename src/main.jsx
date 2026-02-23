import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Scroll to top on page refresh
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0)
})

// Also scroll to top on initial load
window.addEventListener('load', () => {
  window.scrollTo(0, 0)
})

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
