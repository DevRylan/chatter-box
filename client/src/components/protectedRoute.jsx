import React from "react";
import { Navigate } from "react-router-dom";
import Chat from "./chat";
import axios from "axios";

const ProtectedRoute = ({element}) => {
  const [isAuth, authChange] = React.useState(null);
  React.useEffect(()=>{
  const testAuth = async ()=>{
      var isAuthenticated = (await axios.get("http://localhost:8080/api/auth/check-auth", {withCredentials: true})).data;
      console.log("This is the auth status "+isAuthenticated.isAuthenticated+"/n This is the element "+element);
      if(isAuthenticated.isAuthenticated) {authChange(true)}
      else {authChange(false);}
  }
  testAuth();
}, [element]);
  if (isAuth === null) return <div>Loading...</div>
  return isAuth ? element : <Navigate to="/"/>;
};

export default ProtectedRoute;
