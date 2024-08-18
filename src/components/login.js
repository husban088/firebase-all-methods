import React, { useState } from "react";
import '../App.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User Logged In Successfully");
            navigate("/profile");
            toast("User Logged In Successfully")
        } catch (error) {
            console.log(error.message);
            toast(error.message)
        }
    }

    return (
        <>
         <form className="login__cont" onSubmit={handleSubmit}>
            <ToastContainer />
            <h1 className="login__text">Login</h1>
            <div className="inpt__grp">
                <input
                type="email"
                placeholder="Email"
                 className="inpt__txt"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
            </div>

            <div className="inpt__grp">
                <input type="password"
                 placeholder="Password"
                  className="inpt__txt"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
            </div>
            <div className="log__button">
                <button type="submit" className="log__btn">Login</button>
            </div>
         </form>
        </>
    )
}

export default Login;