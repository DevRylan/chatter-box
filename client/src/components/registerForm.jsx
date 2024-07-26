import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm(){
    const [passwordToggle, toggleChange] = React.useState("password");
    const [userForm, userFormChange] = React.useState({username: "", password: ""});

    const navigate = useNavigate('/login');

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
        console.log(userForm);
        let loginTest = await axios.post("http://localhost:8080/api/auth/register", userForm);
        if (loginTest.data.message == "Login Successful"){
            console.log("login Successful");
            navigate('/chat');
        }
        else{
            console.log("login Unsuccessful");
        }
    }
    return(<div id="login-form">
        <form id="login-container">
            <div>
                <h3>Register</h3>
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

export default RegisterForm;