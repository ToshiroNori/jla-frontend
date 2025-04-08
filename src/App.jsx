import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
