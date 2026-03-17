import React, { useState } from 'react'  
import './home.css'
import axios from "axios"
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";


const Home = () => {
    // step:1 read and fetching data
    let [user,setUser]=useState([])
    let [liked,setLiked] = useState({})
    // STEP:1
    let fetchData=async ()=>{
       let data1= await axios.get("http://localhost:9090/users_details")
       console.log(data1)
       let {data}=data1
       console.log(data)
       setUser(data)

    }
    //step-1
    useEffect(()=>{
        fetchData()
    },[])

    //code fro delete
    let deleteData=(id)=>{
      console.log(id);
      if(window.confirm("if you want to delete the data"))
      {
        axios.delete(`http://localhost:9090/users_details/${id}`)
        .then(()=>{
          console.log("data is deleted")
          window.location.reload()
          // toast.warning("data deleted successfully")
        })
        .catch(()=>{
          console.log("error occured")
        })
      }

    }
      let handleLike = (id)=>{
        setLiked({
          ...liked,
          [id]: !liked[id]
        })
      }
   
    // step-1
   return (
    user.length >0 && user ? 
    <div className="container">

     <div className="d-flex justify-content-end mb-3">
     {/* <button className="btn btn-success create-btn"><Link to="/create"><i className="fa-solid fa-user-plus"></i> Create User</Link></button> */}
     <Link to="/create"><button className="btn btn-success create-btn"><i className="fa-solid fa-user-plus"></i> Create User</button></Link>
    </div>
    <div className="row g-4">

      {user.map((value, index) => (

        // <div className="col-md-4 mt-4" >
          <div className="col-lg-3 col-md-4 col-sm-6 " key={value.id}>
          <div className="card user-card h-100">

            {/* Avatar */}
            <div className="avatar-box">
              <img src={` https://api.dicebear.com/9.x/big-ears/svg?seed=${value.name}`} className="card-img-top" height="200" />
            </div>

            <div className="card-body">

              {/* Name */}
              <h5 className="card-title text-center mb-3"><i className="fa-solid fa-user icon"></i> {value.name}</h5>

              {/* Email */}
              <p className="info-row"><i className="fa-solid fa-envelope icon"></i><span>{value.email}</span></p>

              {/* Phone */}
              <p className="info-row"><i className="fa-solid fa-phone icon"></i><span>{value.phone}</span></p>

              {/* Website */}
              <p className="info-row"><i className="fa-solid fa-globe icon"></i><span>{value.website}</span></p>

              {/* Address */}
              <p className="info-row"><i className="fa-solid fa-location-dot icon"></i> <span>{value.address.street}, {value.address.city}</span>  </p>
                
              {/* Company */}
              <p className="info-row"><i className="fa-solid fa-building icon"></i> <span>{value.company.name}</span> </p>
               
              {/* Buttons */}
              <div className="d-flex justify-content-between mt-3">

                {/* <button className="btn btn-outline-danger"> <i className="fa-solid fa-heart"></i> Like</button> */}
                <button className="btn btn-outline-danger" onClick={()=>handleLike(value.id)}><i className="fa-solid fa-heart" style={{ color: liked[value.id] ? "red" : "gray" }}></i>{" "} Like</button>

                <button className="btn btn-outline-primary"><Link to={`/edit/${value.id}`}><i className="fa-solid fa-pen"></i> Edit</Link></button>
              
                <button className="btn btn-outline-dark" onClick={()=>{deleteData(value.id)}}><i className="fa-solid fa-trash"></i> Delete </button> {/* delete function*/ }
                  
              </div>

            </div>

          </div>
        </div>

      ))}

    </div>
  </div>: <h1>data not found</h1>
) 
  
    
  
}

export default Home