import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-between hover:bg-slate-200 p-3 rounded-lg'>
            <div className="flex items-center gap-5">
                <div className="flex rounded-full bg-slate-400 h-10 w-10 text-white justify-center items-center">
                    <div className='text-xl '>
                        {user.firstname[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex font-semibold"> {user.firstname} </div>
            </div>
            <div className="flex items-center justify-center">
                <Button text={"Send Money"} onClick={(e) => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstname);
                }} />
            </div>
        </div>
    )
}

export default User
