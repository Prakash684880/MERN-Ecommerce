import React from 'react'
import { useState } from 'react';
import loginIcons from '../assets/Signin.gif';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import ImageToBase64 from '../helpers/ImageToBase64';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { Link, useNavigate } from 'react-router-dom';




const SignUp = () => {

    const [showPassword, setShowPassword] = useState("false");
    const [showConfirmPassword, setShowConfirmPassword] = useState("false");
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        ConfirmPassword: "",
        profilePic: "",
    })

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.ConfirmPassword) {

            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()
            console.log("data", dataApi)

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }

        } else {
            toast.error("Please check password and confirm password")
        }

    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]
        const imagePic = await ImageToBase64(file)
        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic,
            }
        })

    }

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>

                <div className='bg-white p-2 py-5 w-full max-w-md mx-auto'>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='SignIn_image' />
                        </div>
                        <form>
                            <label>
                                <div className="text-xs text-black bg-slate-200 bg-opacity-70 pt-2 pb-5 py-4 text-center absolute bottom-0 w-full">
                                    upload photo
                                </div>
                                <input type='file' className='hidden' required onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                        <div className='grid'>
                            <label className=''>Name:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter Your Name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

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
                                    {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                                </div>
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={data.ConfirmPassword}
                                    name='ConfirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    placeholder='Enter Confirm Password'
                                    className='w-full h-full bg-transparent outline-none'
                                />
                                <div className='cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)
                                    }
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 hover:bg-red-400 rounded-full text-white px-6 py-2 w-full max-w-[125px] hover:scale-110 transition-all mx-auto block mt-4'>SignUp</button>

                    </form>

                    <p className='my-5'>
                        Already have an account ?
                        <Link to={"/Login"}
                            className='text-red-600 hover:text-red-300 hover:underline '>
                            Login
                        </Link>
                    </p>


                </div>
            </div>
        </section>
    )
}

export default SignUp