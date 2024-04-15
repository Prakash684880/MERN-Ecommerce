import React, { useContext, useState } from 'react'
import loginIcons from '../assets/Signin.gif';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import Context from '../Context';

const Login = () => {

    const [showPassword, setShowPassword] = useState("");
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.Login.url,
            {
                method: SummaryApi.Login.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message);
            fetchUserDetails();
            navigate("/");

        }

        if (dataApi.error) {
            toast.error(dataApi.message)
        }
    }

    console.log("login data :", data)

    return (
        <>
            <section id='login'>
                <div className='mx-auto container p-4'>

                    <div className='bg-white p-2 py-5 w-full max-w-md mx-auto'>
                        <div className='w-20 h-20 mx-auto'>
                            <img src={loginIcons} alt='SignIn_image' />
                        </div>

                        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label className=''>Email:</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        type='text'
                                        placeholder='Enter Email'
                                        name='email'
                                        value={data.email}
                                        required
                                        onChange={handleOnChange}
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='grid'>
                                <label>Password:</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={data.password}
                                        name='password'
                                        required
                                        onChange={handleOnChange}
                                        placeholder='Enter Password'
                                        className='w-full h-full bg-transparent outline-none'
                                    />
                                    <div className='cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )
                                        }
                                    </div>
                                </div>
                                <Link to={'/forget-password'} className='block ml-auto w-fit hover:underline hover:text-red-400 '>
                                    Forget Password ?
                                </Link>
                            </div>

                            <button className='bg-red-600 hover:bg-red-400 rounded-full text-white px-6 py-2 w-full max-w-[125px] hover:scale-110 transition-all mx-auto block mt-4'>Login</button>

                        </form>

                        <p className='my-5'>
                            Don't have account ?
                            <Link to={"/Sign-up"}
                                className='text-red-600 hover:text-red-300 hover:underline '>
                                Sign Up
                            </Link>
                        </p>


                    </div>
                </div>
            </section>
        </>
    )
}

export default Login