import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Page404 from "./pages/404"; // Changement du nom pour correspondre

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="*" element={<Page404 />} /> {/* Capture les erreurs de navigation */}
      </Routes>
    </Router>
  );
}

export default App;
