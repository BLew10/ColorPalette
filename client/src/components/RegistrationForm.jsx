import React, { useState } from 'react'
import axios from 'axios';
import {
    useNavigate
} from "react-router-dom"


const UserForm = (props) => {
    const navigate = useNavigate()

    //keep track of what is being typed via useState hook
    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        PasswordConfirm: ""
    });
    //handler when the form is submitted
    const [errors, setErrors] = useState([]);

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

  

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    axios({
      url: "http://localhost:5029/api/user/create",
      method: "post",
      data: user,
      contentType: "application/json"
    })
      .then((res) => {
        console.log("success")
        window.sessionStorage.setItem("userId", res.data.userId)
        navigate("/dashboard")
    })
      .catch(err => { console.log(err)
        // setErrors(err.response.data)
      });
  };


    return (
        <form onSubmit={onSubmitHandler} className="my-2 flex flex-col justify-center [&>*]:text-md text-white  h-[300px]">
            {errors.map((err, index) => <p className='text-red-500 font-bold' key={index}>{err}</p>)}
            <p  className='flex my-3'>
                <label className="basis-1/3 font-bold ">First Name: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4  text-black ' type="text" onChange={(e) => changeHandler(e)} value={user.FirstName} name="FirstName" />
                {/* {errors ? <p className='text-red-500 font-bold' >{errors[0].message}</p> : null } */}
            </p>
            <p className='flex my-3'>
                <label className="basis-1/3 font-bold ">Last Name: </label>
                <input className='border-2 border-slate-300 rounded  w-full basis-2/3 md:basis-3/4  text-black' type="text" onChange={(e) => changeHandler(e)} value={user.LastName} name="LastName" />
            </p>
            <p className='flex my-3'>
                <label  className="basis-1/3 font-bold ">Email: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4  text-black' type="text" onChange={(e) => changeHandler(e)} value={user.Email} name="Email" />
            </p>
            <p className='flex my-3'>
                <label className="basis-1/3 font-bold ">Password: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4  text-black' type="text" onChange={(e) => changeHandler(e)} value={user.Password} name="Password" />
            </p>
            <p className='flex my-3'>
                <label className="basis-1/3  font-bold ">Confirm Password: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4  text-black' type="text" onChange={(e) => changeHandler(e)} value={user.PasswordConfirm} name="PasswordConfirm" />
            </p>
            <input className='p-1 bg-[#252afd] rounded w-2/3 mx-auto hover:cursor-pointer hover:scale-105 hover:bg-blue-300 font-semibold text-white text-center flex-none' type="submit" />
        </form>
    )
}

export default UserForm