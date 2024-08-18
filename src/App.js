import { Route, Routes } from "react-router-dom";
import Home from "./components";
import Login from "./components/login";
import Signup from "./components/signup";
import Profile from "./components/profile";
import Navbar from "./components/navbar";
import Number from "./components/Number";


function App() {



  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/number" element={<Number />}/>
    </Routes>
    </>
  );
}

export default App;
