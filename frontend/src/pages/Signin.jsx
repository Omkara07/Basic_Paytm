import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Subheading from '../components/Subheading'
import Input from '../components/Input'
import Button from '../components/Button'
import BottomText from '../components/BottomText'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [username, setEmail] = useState('')
    const [password, setPass] = useState('')
    useEffect(() => {

    },)
    return (
        <div className="flex justify-center items-center bg-indigo-50 h-screen">
            <div className='flex flex-col w-[30vw] min-h-[70vh] items-center bg-white rounded-lg shadow-md shadow-gray-400 focus-within:shadow-md focus-within:shadow-gray-600'>
                <Header text={"Login"} />
                <Subheading text={"Enter your Credentials"} />
                <Input className="w-full" label={"Email"} type={"email"} onChange={(e) => {
                    setEmail(e.target.value)
                }} placeholder={"John@gmail.com"} />
                <Input className="w-full " label={"Password"} type="password" onChange={(e) => {
                    setPass(e.target.value)
                }} placeholder={"Password"} />
                <div className='flex mt-8 w-[71%] justify-center items-center'>
                    <Button className='w-[100%]' text={"Login"} onClick={async () => {
                        try {
                            const res = await axios.post("https://basic-paytm-api.onrender.com/api/v1/user/signin", {
                                username,
                                password
                            });
                            localStorage.setItem("token", res.data.token)
                            navigate("/dashboard")
                        }
                        catch (e) {
                            alert(e)
                        }
                    }} />
                </div>
                <BottomText text={"Don't have an account?"} to={'/signup'} btnText={'Signup'} />
            </div>
        </div>
    )
}

export default Signup