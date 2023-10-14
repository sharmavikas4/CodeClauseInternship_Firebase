import {auth,googleProvider,githubProvider,facebookProvider} from "../config/firebase-config";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import "./SignUp.css"
function SignUp(props) {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const  [message,setMessage] = useState("");
    const navigate = useNavigate();
    const change = (e)=>{
        const {name,value} = e.target;
        if (name==="email"){
            setEmail(value);
        }
        else{
            setPassword(value);
        }
    }

    const submit = async()=>{
        await createUserWithEmailAndPassword(auth,email,password).then((res)=>{
            if (auth?.currentUser){
                props.l(true);
                navigate("/");
            }
            console.log(res);
        }).catch(async (err)=>{
            if (err.code="auth/email-already-in-use"){
                await signInWithEmailAndPassword(auth,email,password).then((res)=>{
                    if (auth?.currentUser){
                        props.l(true);
                        navigate("/");
                    }
                    console.log(res);
                }).catch((err)=>{
                    console.log(err.code);
                    if (err.code=="auth/missing-password"){
                        setMessage("*Please enter password");
                    }
                    else {
                        if (err.code=="auth/invalid-email"){
                            setMessage("*Please enter valid email");
                        }
                        else{
                            console.log(err.code);
                        }
                    }
                });
            }
        });
    }
    const google = async ()=>{
        await signInWithPopup(auth,googleProvider).then((res)=>{
            if (auth?.currentUser){
                props.l(true);
                navigate("/");
            }
            console.log(res);
            }).catch((err)=>{
            if (err.code=="auth/account-exists-with-different-credential"){
                setMessage("Login with the way you logged in earlier");
            }
            else{
                console.log(err.code);
            }
        });
    }
    const github = async ()=>{
        await  signInWithPopup(auth,githubProvider).then((res)=>{
            if (auth?.currentUser){
                props.l(true);
                navigate("/");
            }
            console.log(res);
        }).catch((err)=>{
            if (err.code=="auth/account-exists-with-different-credential"){
                setMessage("Login with the way you logged in earlier");
            }
            else{
                console.log(err.code);
            }
        });
    }
    const facebook = async ()=>{
        await  signInWithPopup(auth,facebookProvider).then((res)=>{if (auth?.currentUser){
                props.l(true);
                navigate("/");
            }
            console.log(res)
        }).catch((err)=>{
            if (err.code=="auth/account-exists-with-different-credential"){
                setMessage("Login with the way you logged in earlier");
            }
            else{
                console.log(err.code);
            }
        });
    }
  return (
    <div className="signUp">
        <div className="card">
        <div className="buttondiv">
        <h1 className="new">Login in to continue</h1>
        <button className="google" onClick={google}><GoogleIcon className="icon" fontSize="small"/> Login in with Google</button>
        <button className="google" onClick={github}><GitHubIcon className="icon" fontSize="small"/> Login in with Github</button>
        <button className="google" onClick={facebook}><FacebookIcon className="icon" fontSize="small"/> Login in with Facebook</button>
        <button className="google" onClick={()=>{navigate("/phone")}}><PhoneIcon className="icon" fontSize="small"/> Sign In with Phone Number</button>
        </div>
        <h2 className="or"><hr className="line"/> Or <hr className="line"/></h2>
        <h2 className="new">Create a new account</h2>
        <div className="credential">
        <label className="label">Email<span className="span">*</span></label>
        <input placeholder="Enter your email..." value={email} name="email" className="email" onChange={change} type="email" required></input>
        <label className="label">Password<span className="span">*</span></label>
        <input placeholder="Enter your password..." value={password} name="password" className="password" onChange={change} type="password" required></input>
        <p className="already">Already have an account?<span className="signin" onClick={()=>{navigate("/signin")}}>Sign in</span></p>
        </div>
        <div className="buttondiv">
        <button onClick={submit} className="signUpButton">Sign Up</button>
        </div>
        <p className="message">{message}</p>
        </div>
    </div>
  )
}
export default SignUp