import React from "react";
import Chat from "./components/chat";
import LoginForm from "./components/loginForm"
import RegisterForm from "./components/registerForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<LoginForm/>}/>
        <Route path="/chat" element={<ProtectedRoute element={<Chat/>}/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
