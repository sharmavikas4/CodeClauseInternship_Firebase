import "./Home.css";
import {auth} from "../config/firebase-config";
import {signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Home(props) {
  const navigate = useNavigate();
  const logout = async ()=>{
    await signOut(auth).then((res)=>{
      props.l(false);
      navigate("/signup");
    }).catch((err)=>{
      console.log(err.code);
    })
  }
  return (
    <div>
      <div className="container">
        <h1 className="head">Welcome to Firebase Authenticated App</h1>
        <img src="firebase.png" className="firebase"></img>
        <div className="button">
        <button onClick={logout} className="btn">Log Out</button>
        </div>
      </div>
    </div>
  )
}
export default Home