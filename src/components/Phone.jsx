import {auth,phoneProvider} from "../config/firebase-config";
import {RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import { useState } from "react";
import './Phone.css';
import { useNavigate } from "react-router-dom";
function Phone(props) {
    const [country,setCountry] = useState(91);
    const [phone,setPhone] = useState("");
    const [generate,setGenerate] = useState(false);
    const [otp,setOtp] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const captchaVerify = ()=>{
        if (!window.recaptchaVerifier){
           window.recaptchaVerifier = new RecaptchaVerifier(auth,"recaptcha-container",{
                size: "invisible",
                callback: (response) => {
                    signin();
                  },
            })
        }
    }
    const genOtp = async ()=>{
        captchaVerify();
        const appVerifier = window.recaptchaVerifier;
        const pnumber = "+" + country + phone;
        await signInWithPhoneNumber(auth,pnumber, appVerifier)
        .then((confirmationResult) => {
            setGenerate(true);
            window.confirmationResult = confirmationResult;
        }).catch((error) => {
            console.log(error);
    });
    }
    const verifyOtp = async ()=>{
        window.confirmationResult.confirm(otp).then(async (res)=> {
            props.l(true);
            navigate("/");
        }).catch((err)=>{
            serMessage("Invalid OTP");
            console.log(err.code);
        })
    }
    const change = (e)=>{
        const {name,value} = e.target;
        if (name=="country"){
            setCountry(value);
        }
        else{
            if (name=="phone"){
                setPhone(value);
            }
            else{
                setOtp(value);
            }
        }
    }
  return (
    <div className="Phone">
        <div className="main">
        <h1 className="heading">Login using Phone Number</h1>
        {!generate&&<label className="label">Country Code<span className="span">*</span></label>}
        {!generate&&<input type="number" name="country" placeholder="Country code..." className="email" value={country} onChange={change}></input>}
        {!generate&&<label className="label">Phone Number<span className="span">*</span></label>}
        {!generate&&<input type="number" name="phone" placeholder="Phone number..." className="email" value={phone} onChange={change}></input>}
        {generate&&<label className="label">OTP(One Time password)<span className="span">*</span></label>}
        {generate&&<input type="number" name="otp" placeholder="One Time Password..." className="email" value={otp} onChange={change}></input>}
        <div id="recaptcha-container"></div>
        <div className="buttondiv">
            {!generate&&<button onClick={genOtp} className="signUpButton">Generate OTP</button>}
            {generate&&<button onClick={verifyOtp} className="signUpButton">Verify OTP</button>}
        </div>
        <p className="message">{message}</p>
        </div>
    </div>

  )
}
export default Phone