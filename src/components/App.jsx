import SignUp from "./SignUp";
import Home from "./Home";
import SignIn from "./SignIn";
import Phone from "./Phone";
import {auth} from "../config/firebase-config"
import { useEffect, useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  const [login,setLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={login?<Home l={setLogin}/>:<SignUp l={setLogin}/> }></Route>
        <Route path="/signup" element={<SignUp l={setLogin}/>}></Route>
        <Route path="/signin" element={<SignIn l={setLogin}/>}></Route>
        <Route path="/phone" element={<Phone l={setLogin}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App