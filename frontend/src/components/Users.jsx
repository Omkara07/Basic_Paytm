import React, { useEffect, useState } from 'react'
import User from './User'
import axios from 'axios'
import { useDebounce } from '../hooks/useDebounce'
import { PulseLoader } from 'react-spinners'

const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    const debounceval = useDebounce(filter)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            await axios.get("https://basic-paytm-api.onrender.com/api/v1/user/getUser?filter=" + debounceval, {
                headers: {
                    authentication: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => {
                    setUsers(res.data.users)
                })

            setLoading(false)
        }
        load()
    }, [debounceval])
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
            {loading && <PulseLoader margin={2} size={9} className='mt-6 px-20' />
            }
            {!loading && <div className="flex flex-col px-5 gap-6 mt-6">
                {users.map((user) => {
                    return <User key={user._id} user={user} />
                })}
            </div>}
        </div>
    )
}

export default Users
