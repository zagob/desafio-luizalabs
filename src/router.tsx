import { Routes, Route } from "react-router-dom";
import { CharactersDetail } from "./pages/CharactersDetail";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details" element={<CharactersDetail />} />
    </Routes>
  );
}
