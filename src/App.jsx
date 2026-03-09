import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Header from "./shared/Header";

import "./App.css";

function App() {
  const location = useLocation();

  const title =
    location.pathname === "/"
      ? "Home"
      : location.pathname === "/about"
        ? "About"
        : location.pathname === "/dashboard"
          ? "Dashboard"
          : "Not Found";

  return (
    <>
      <Header title={title} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
