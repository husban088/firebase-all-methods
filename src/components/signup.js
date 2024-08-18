import React, { useState } from "react";
import '../App.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase';
import { toast, ToastContainer } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
           await createUserWithEmailAndPassword(auth,email, password);
           const user = auth.currentUser;
           console.log(user);
           if(user) {
             await setDoc(doc(db, "Users", user.uid),{
                email: user.email,
                firstName: fname,
                lastName: lname,
             })
           }
           
           console.log("User Registered Successfully");
           toast("User Registered Successfully")
        } catch (error) {
            toast(error.message)
        }
    }


    return (
        <>



       <form className="login__cont" onSubmit={handleRegister}>
       <ToastContainer />
            <h1 className="login__text">Signup</h1>

            <div className="inpt__grp">
                <input
                type="text"
                placeholder="First name"
                 className="inpt__txt"
                 value={fname}
                 onChange={(e) => setFname(e.target.value)}
                 required
                 />
            </div>

            <div className="inpt__grp">
                <input
                type="text"
                placeholder="Last name"
                 className="inpt__txt"
                 value={lname}
                 onChange={(e) => setLname(e.target.value)}
                 required
                 />
            </div>

            <div className="inpt__grp">
                <input
                type="email"
                placeholder="Email"
                 className="inpt__txt"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 />
            </div>

            <div className="inpt__grp">
                <input type="password"
                 placeholder="Password"
                  className="inpt__txt"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  />
            </div>
            <div className="log__button">
                <button type="submit" className="log__btn">Signup</button>
            </div>
         </form>
        </>
    )
}

export default Signup;