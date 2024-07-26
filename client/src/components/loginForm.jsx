import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm(){
    const [passwordToggle, toggleChange] = React.useState("password");
    const [userForm, userFormChange] = React.useState({username: "", password: ""});
    //Hooks for input change and password visiblity toggle
    const navigate = useNavigate();

    function toggleView(){
        if (passwordToggle === "password"){
            toggleChange("text");
        }
        else{
            toggleChange("password");
        }
    }
    function updateFormInfo(e){
        if (e.target.placeholder === "Username"){
            userFormChange((prevValue)=>{
            return{
                username: e.target.value,
                password: prevValue.password
            }//Updated the changed value
            });
        }
        else{
            userFormChange((prevValue)=>{
                return{
                username: prevValue.username,
                password: e.target.value};
            })
        }
    }
    async function handleSubmit(){
        //Submits form & grabs login data
        let address = import.meta.env.VITE_LOCAL_ADDRESS;
        let loginTest = await axios.post(`${address}/api/auth/login`, userForm, {withCredentials: true});

        if (loginTest.data.message == "Login Successful"){
            console.log("login Successful");
            navigate('/chat');
        }
        else{
            //TODO: display information on why user could not login
            console.log("login Unsuccessful");
        }
    }
    return(<div id="login-form">
        <form id="login-container">
            <div>
                <h3>Login</h3>
                <hr/>
            </div>
            <input type="text" placeholder="Username" onChange={updateFormInfo} className="login-input"/>
            <div>
                <input type={passwordToggle} placeholder="Password" onChange={updateFormInfo} className="login-input"/>
                <input type="checkbox" onClick={toggleView}/>
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
    </div>);
}

export default LoginForm;