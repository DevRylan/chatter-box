import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({element}) => {
  const [isAuth, authChange] = React.useState(null);
  React.useEffect(()=>{
  const testAuth = async ()=>{
      var isAuthenticated = (await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/auth/check-auth`, {withCredentials: true})).data;
      console.log("This is the auth status "+isAuthenticated.isAuthenticated);
      if(isAuthenticated.isAuthenticated) {authChange(true)}
      else {authChange(false);}
  }
  testAuth();
}, [element]);
  if (isAuth === null) return <div>Loading...</div>
  return isAuth ? element : <Navigate to="/login"/>;
};

export default ProtectedRoute;
