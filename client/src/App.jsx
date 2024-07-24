import React from "react";
import Chat from "./components/chat";
import LoginForm from "./components/loginForm"
import RegisterForm from "./components/registerForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<LoginForm/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
