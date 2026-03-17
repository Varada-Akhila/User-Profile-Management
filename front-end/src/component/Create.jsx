import React, { useState } from "react";
import axios from "axios"
import "./Create.css"
import { toast } from "react-toastify"; 
import { useNavigate } from "react-router-dom";

const Create = () => {

  // Basic details
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

  // Company
  const [companyName, setCompanyName] = useState();
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
   axios.post("http://localhost:9090/users_details",userData)
   .then(()=>{
    console.log("data is created");
    toast.success("Data is created Successfully")
    navigate("/")
   })
   .catch(()=>{
    console.log("error occured")
   })

    console.log(userData);
  };

  return (
    <div className="create-page">
    <div className="container mt-4">

      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>

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
        

        <button className="btn btn-success">
          Create User
        </button>

      </form>
    </div>
    </div>
  );
};

export default Create;