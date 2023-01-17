import React, { useState } from 'react'
import axios from 'axios';
import {
    useNavigate
} from "react-router-dom"

const Login = (props) => {
    const nav = useNavigate()


    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const [user, setUser] = useState({
        LogEmail: "",
        LogPassword: ""
    });
    const [errors, setErrors] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(user);
        axios({
            url: "http://localhost:5029/login",
            method: "post",
            data: user,
            contentType: "application/json"
        })
            .then((res) => {
                window.sessionStorage.setItem("userId", res.data.userId)
                nav(`/dashboard`)

            })
            .catch(err => {
                setErrors({ ...err.response.data })
            });
    };


    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col justify-start text-white ">
            <div>
                <span className='text-red-500 font-bold'>{errors.LogEmail}</span>
                <p className='flex my-3 mt-5 '>
                    <label className="basis-1/4  font-bold " >Email: </label>
                    <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4 text-black ' type="text" onChange={(e) => changeHandler(e)} value={user.LogEmail} name="LogEmail" />
                </p>
            </div>
            <div>
                <span className='text-red-500 font-bold'>{errors.LogPassword}</span>
                <p className='flex my-3 '>

                    <label className="basis-1/4  font-bold ">Password: </label>
                    <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4 text-black' type="text" onChange={(e) => changeHandler(e)} value={user.LogPassword} name="LogPassword" />
                </p>
            </div>
            <input className='p-1  bg-[#252afd] rounded w-2/3 mx-auto hover:cursor-pointer hover:scale-105 hover:bg-blue-300 font-semibold text-slate-100 text-black' type="submit" />
        </form>
    )
}

export default Login