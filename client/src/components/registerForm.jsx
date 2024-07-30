import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm(){
    const [passwordToggle, toggleChange] = React.useState("password");
    const [userForm, userFormChange] = React.useState({username: "", password: ""});
    const [error, errorChange] = React.useState('');
    //Hooks for keeping track of input & password visibility
    const navigate = useNavigate('/login');

    function toggleView(){
        if (passwordToggle === "password"){
            toggleChange("text");
        }
        else{
            toggleChange("password");
        }
    }

    function updateFormInfo(e){ //Updated hooks state on input change
        if (e.target.placeholder === "Username"){
            //Finds which value changed
            userFormChange((prevValue)=>{
            return{
                username: e.target.value,
                password: prevValue.password
            }
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
        if(userForm.username.length === 0 ){//Checks if username has any text
            errorChange("Enter a Username");
        }
        else if (userForm.password.length < 6){//Makes sure password meets length requirement
            errorChange("Password Must be at Least Six Characters");
        }else{
        let loginTest = await axios.post(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/auth/register`, userForm, { withCredentials: true});
        if (loginTest.data.message == "Login Successful"){
            navigate('/chat');
        }
        else{
            //TODO: Add display to the user exactly why the form was rejected in the register
            errorChange("Incorrect Username or Password");
            console.log("login Unsuccessful");
        }}
    }
    return(<div id="login-form">
        <form id="login-container">
            <div>
                <h3>Register</h3>
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

export default RegisterForm;