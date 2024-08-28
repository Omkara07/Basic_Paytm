import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'

const Dashboard = () => {
    const [amt, setAmt] = useState(0)
    const [me, setMe] = useState({})
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                authentication: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                setAmt(res.data.bal)
                return axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        authentication: "Bearer " + localStorage.getItem("token")
                    }
                })
            })
            .then(n => {
                setMe(n.data.user)
            })
    }, [])
    return (
        <div className='flex flex-col justify-center'>
            <Appbar />
            <div>
                <Balance value={amt} user={me} />
                <Users />
            </div>
        </div>
    )
}

export default Dashboard
