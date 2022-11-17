import React, { useState } from "react"
import { GoogleOAuthProvider} from "@react-oauth/google";
import {GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode"
import Swal from "sweetalert2";


import "../../css/header.css"
const Header = () => {
    let tap = () =>{
        window.location.reload();
    }
    let getTokenDetails = () =>{
      // read the data from the localStorage
      let token = localStorage.getItem("auth-token");
      if(token === null)
      {
        return false;
      }
      else{
        return jwt_decode(token);
      }
    }
    let [userLogin,setUserLogin] = useState(getTokenDetails)

    let onSuccess = (credentialResponse) =>{
      let token = credentialResponse.credential;
      let data = jwt_decode(token);
      console.log(data);
      // save 
      localStorage.setItem("auth-token",token);
      // alert("Login successfully");
      Swal.fire({
        icon: 'success',
        title: 'Login Successfully ',
        text: 'Now you can write your notes!!!',
      })
      .then(()=>
      { 
        window.location.reload();
      });
  

    }
    let logout = () =>{
      localStorage.removeItem("auth-token");
      setUserLogin(false);
      // alert("User Logout Successfully");
      Swal.fire({
        icon: 'success',
        title: 'User Logout Successfully ',
      })
      .then(()=>
      { 
        window.location.reload();
      });
      
    }
    let onError = ()=>{
      // alert("Login Fail");
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong!',
      })
      .then (()=> {
        window.location.reload();
      })
    }
    return ( <>
<GoogleOAuthProvider clientId ="67689682803-lk4a458n1sgcidj63m0bf5l92mmslbgv.apps.googleusercontent.com">

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Google Sign-In</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex justify-content-center">
       
       <GoogleLogin onSuccess={ onSuccess}
        onError = {onError}
       />
             </div>
    </div>
  </div>
</div>
    { userLogin ? ( <div className="header d-flex justify-content-between " >
            <h1 onClick={tap} className="cursor_pointer">The Keeper App</h1>
            <div className="d-flex welcomeButton justify-content-between">
            <p className="p-0 mt-3 fw-bolder">Welcome {userLogin.given_name}</p>
            <button className="btn btn-outline-primary logoutbutton " onClick={logout} >Logout</button>
            </div>
        </div>) : ( <div className="header d-flex justify-content-between " >
            <h1 onClick={tap} className="cursor_pointer">The Keeper App</h1>
            <button className="btn btn-outline-primary loginbutton" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
        </div>)
        }
       
</GoogleOAuthProvider>
      
        </>
    )
}

export default Header