import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm(){
    const [passwordToggle, toggleChange] = React.useState("password");
    const [userForm, userFormChange] = React.useState({username: "", password: ""});
    //Hooks for input change and password visiblity toggle
    const [error, errorChange] = React.useState('');
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
        try{
        //Submits form & grabs login data
        let address = import.meta.env.VITE_LOCAL_ADDRESS;
        await axios.post(`${address}/api/auth/login`, userForm, {withCredentials: true});
        navigate('/chat');
        }
        catch(err){
            //Incase of incorrect submit data
            errorChange("Incorrect Username or Password");
            console.log("Login Unsuccessful. Error: " +err);
        }
        console.log('exiting function');
    }
    return(<div id="login-form">
        <form id="login-container">
            <div>
                <h3>Login</h3>
                <hr/>
            </div>
            <input type="text" placeholder="Username" onChange={updateFormInfo} className={`login-input ${error ? "input-error" : ""}`}/>
            <div>
                <input type={passwordToggle} placeholder="Password" onChange={updateFormInfo} className={`login-input ${error ? "input-error" : ""}`}/>
                <input type="checkbox" onClick={toggleView}/>
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            {error ? <h3 className="error-message">{error}</h3> : null}
        </form>
    </div>);
}

export default LoginForm;