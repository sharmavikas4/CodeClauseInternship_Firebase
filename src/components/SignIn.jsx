import { useState } from "react";
import {auth} from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
function SignIn(props) {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const change = (e)=>{
    const {name,value} = e.target;
    if (name=="email"){
      setEmail(value);
    }
    else{
      setPassword(value);
    }
  }
  const signin = async ()=>{
    await signInWithEmailAndPassword(auth,email,password).then((res)=>{props.l(true); navigate("/")}).catch((err)=>{
      if (err.code =="auth/missing-password"){
        setMessage("Please enter password");
      }
      else{
        if (err.code == "auth/invalid-email"){
          setMessage("Please enter a valid email");
        }
        else if (err.code == "auth/invalid-login-credentials"){
          setMessage("Please enter valid credentials");
        }
      }
      console.log(err.code);
    })
  }
  return (
    <div className="signIn">
      <div className="center">
        <h1 className="title">Sign in with your existing account</h1>
        <div className="credential">
        <label className="label">Email<span className="span">*</span></label>
        <input placeholder="Enter Email..." type="email" name="email" value={email} className="email" onChange={change}></input>
        <label className="label">Password<span className="span">*</span></label>
        <input placeholder="Enter Password..." type="password" name="password" value={password} className="email" onChange={change}></input>
        </div>
        <div className="buttondiv">
        <button onClick={signin} className="signUpButton">Sign In</button>
        </div>
        <p className="message">{message}</p>
      </div>
    </div>
  )
}
export default SignIn