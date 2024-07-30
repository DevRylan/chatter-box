import React from "react";
import Chat from "./components/chat";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<ProtectedRoute element={<Chat />}/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        {/*Acceses the protected route element which will test if user is authenticated*/}
        <Route path="/chat" element={<ProtectedRoute element={<Chat/>}/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
