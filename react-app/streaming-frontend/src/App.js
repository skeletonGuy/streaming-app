import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import EventConfigPage from "./pages/EventConfigPage/EventConfigPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/event/:access" element={<EventConfigPage />} />
    </Routes>
  );
}

export default App;
