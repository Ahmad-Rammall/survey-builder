import { useState } from "react";
import Login from "./pages/AuthenticatinPages/Login";
import Register from "./pages/AuthenticatinPages/Register";
import User from "./pages/UserPage/User";
import Admin from "./pages/AdminPage/Admin"
import SurveyPage from "./pages/SurveyPage/SurveyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/survey/:id" element={<SurveyPage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
