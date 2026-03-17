import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Create.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Edit = () => {

  // let userid=useParams() //slug
  // console.log(userid)

    const [id, setId] = useState();
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [website, setWebsite] = useState();
  
    // Address in single state
    const [address, setAddress] = useState({
      street: "",
      suite: "",
      city: "",
      zipcode: ""
    });
    const [companyName, setCompanyName] = useState();
  
   let {userid}=useParams() //slug and destructuring at a time
    console.log(userid)

  let navigate=useNavigate()
  
  const handleSubmit =(e) => {
    e.preventDefault();

    const userData = {
      id,
      username,
      name,
      email,
      phone,
      website,
      address,
      company: {
        name: companyName
      }
    };
    console.log(userData)
  }

  //read the data
  useEffect(()=>{
      axios.get(`http://localhost:9090/users_details/${userid}`)
      .then((res)=>{
        console.log(res)
        let {data}=res
        console.log(data)
        setId(data.id)
        setUsername(data.username)
        setName(data.name)
        setEmail(data.email)
        setPhone(data.phone)
        setWebsite(data.website)
        setAddress(data.address)
        setCompanyName(data.companyName)


      })
  }, [])

  //update the data

  let updateData=(e)=>{
    e.preventDefault()
     let userData = {
      id,
      username,
      name,
      email,
      phone,
      website,
      address,
      company: {
        name: companyName
      }
    };
    axios.put(`http://localhost:9090/users_details/${userid}`,userData)
    .then(()=>{
      console.log("data is upadated")
      toast.success("data updated successfully")
      navigate("/")
      
    })
    .catch(()=>{
      console.log("error occured")
    })
  }
  
  return (
    <div>
        <div className="create-page">
        <div className="container mt-4">
          <h2>Edit</h2>

      <form onSubmit={updateData}>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label>ID</label>
            <input type="tel" className="form-control" value={id} onChange={(e)=>setId(e.target.value)} />
          </div>

          <div className="col-md-6 mb-3">
            <label>Username</label>
            <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>

          <div className="col-md-6 mb-3">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input type="email"  className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>

        </div>

        <h4>Address</h4>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label>Street</label>
            <input type="text" className="form-control" value={address.street} onChange={(e)=>setAddress({...address, street:e.target.value})}/>
          </div>

          <div className="col-md-6 mb-3">
            <label>Suite</label>
            <input type="text" className="form-control" value={address.suite} onChange={(e)=>setAddress({...address, suite:e.target.value})}/>
          </div>

          <div className="col-md-6 mb-3">
            <label>City</label>
            <input type="text" className="form-control" value={address.city} onChange={(e)=>setAddress({...address, city:e.target.value})}/>
          </div>

          <div className="col-md-6 mb-3">
            <label>Zipcode</label>
            <input type="text" className="form-control" value={address.zipcode} onChange={(e)=>setAddress({...address, zipcode:e.target.value})} />
          </div>
          

        </div>
        <div className="row">
              <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>

          <div className="col-md-6 mb-3">
            <label>Website</label>
            <input type="text" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)}/>
          </div>
          <div className="col-md-6 mb-3">
            <label>Company</label>
            <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
          </div>
        </div>

        <button className="btn btn-success">Edit User</button>

      </form>
    </div>
    </div>
    </div>
)}

export default Edit