import React, { useState } from 'react'
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
    const [firstname, setFname] = useState('')
    const [lastname, setLname] = useState('')
    return (
        <div className="flex justify-center items-center bg-indigo-50 h-screen">
            <div className='flex flex-col w-[30vw] min-h-[70vh] items-center bg-white rounded-lg shadow-md shadow-gray-400 focus-within:shadow-md focus-within:shadow-gray-600'>
                <Header text={"Signup"} />
                <Subheading text={"Enter your Credentials"} />
                <Input className="w-full" label={"First Name"} onChange={(e) => {
                    setFname(e.target.value)
                }} placeholder={"John"} />
                <Input className="w-full" label={"Last Name"} onChange={(e) => {
                    setLname(e.target.value)
                }} placeholder={"Doe"} />
                <Input className="w-full" label={"Email"} type={"email"} onChange={(e) => {
                    setEmail(e.target.value)
                }} placeholder={"John@gmail.com"} />
                <Input className="w-full" label={"Password"} type={"password"} onChange={(e) => {
                    setPass(e.target.value)
                }} placeholder={"Password"} />
                <div className='flex mt-8 w-[71%] justify-center items-center'>
                    <Button text={"Signup"} onClick={async () => {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            firstname,
                            lastname,
                            password
                        });
                        localStorage.setItem("token", res.data.token)
                        navigate("/dashboard")
                    }} />
                </div>
                <BottomText text={"Already have an account?"} to={'/signin'} btnText={'Login'} />
            </div>
        </div>
    )
}

export default Signup
