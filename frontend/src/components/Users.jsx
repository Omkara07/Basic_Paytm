import React, { useEffect, useState } from 'react'
import User from './User'
import axios from 'axios'

const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get("https://basic-paytm-api.onrender.com/api/v1/user/getUser?filter=" + filter, {
            headers: {
                authentication: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                setUsers(res.data.users)
            })
    }, [filter])
    return (
        <div className='flex flex-col p-12 gap-5'>
            <div className="flex font-bold text-lg">
                Users
            </div>
            <div className="flex ">
                <input className='flex p-2 w-[80%]  rounded-lg border-slate-500 border focus-within:border-[2px]' type="text" onChange={(e) => {
                    setFilter(e.target.value)
                }} placeholder='Search Users...' />
            </div>
            <div className="flex flex-col px-5 gap-6 mt-6">
                {users.map((user) => {
                    return <User key={user._id} user={user} />
                })}
            </div>
        </div>
    )
}

export default Users
