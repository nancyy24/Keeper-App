import React, { useState } from "react"

import "../../css/addKeeper.css";
import axios from "axios"
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode"
const AddKeeper = ({ setKeeperList }) => {
    let start = () =>{
        // alert("First login to page")
        Swal.fire('First login to page')
        .then(() =>{
            window.location.reload();
        })
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

      let [userDetails,setUserDetails] = useState(getTokenDetails)
    const [keeperObj, setKeeperObj] = useState({
        title: "",
        description:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        // console.log(name,value);
        // console.log({
        //     ...keeperObj,
        //     [name]: value
        // })
        // updating values
        setKeeperObj({
            ...keeperObj,
            [name]: value
        })
    }

    const add = () => {
        if(keeperObj.title) {
            axios.post("http://localhost:3001/api/addNew", keeperObj)
            .then(res => setKeeperList(res.data))
            setKeeperObj({
                title: "",
                description:""
            })
            Swal.fire({
                icon: 'success',
                title: 'Saved Successfully ',
                text: 'Your notes are updated',
              })
              .then(()=>
              { 
                window.location.reload();
              });
        }
      
    }

    return (
        <div className="addKeeper">
           <input
                className="inputBox titleInput"
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Add Title"
                onChange={handleChange}
                value={keeperObj.title}
            />
            <textarea 
                className="inputBox description"
                name="description"
                placeholder="Add Description Here"
                onChange={handleChange}
                value={keeperObj.description}
            />
            { userDetails ? ( <div className="addButton" onClick={add}>Add</div>): (<div className="addButton" onClick={start}>Add</div>) }
            
        </div>
    )
}

export default AddKeeper