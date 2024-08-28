import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Input from '../components/Input';
import axios from 'axios';

const SendMoney = () => {
    const navigate = useNavigate()
    const [serachParams] = useSearchParams();
    const id = serachParams.get("id");
    const name = serachParams.get("name");
    const [amount, setAmt] = useState(0);
    return (
        <div className="flex justify-center items-center h-screen bg-slate-200">
            <div className='flex flex-col border w-[30vw] items-center justify-center bg-white rounded-lg shadow-md shadow-gray-400 gap-8'>
                <h2 className='flex p-8 text-3xl font-bold justify-center items-center'>
                    Send Money
                </h2>
                <div className='flex flex-col w-full px-8'>
                    <div className="flex gap-2 items-center  text-xl font-bold">
                        <div className="flex rounded-full bg-green-500 h-10 w-10 text-white justify-center items-center">
                            <div className='text-xl '>
                                {name[0].toUpperCase()}
                            </div>
                        </div>
                        <div className="flex font-bold text-2xl"> {name} </div>
                    </div>
                    <div className="flex flex-col pt-4 w-full">
                        <div className='flex font-semibold'>Amount (in Rs)</div>
                        <input className='border-[1px] border-gray-400 rounded-md p-1' type="number" placeholder="Enter the amount" onChange={(e) => {
                            setAmt(e.target.value)
                        }} />
                    </div>
                    <div className='flex w-full mt-4 mb-8'>
                        <button className='text-sm bg-green-500 text-white font-bold rounded-md p-2 w-full' onClick={async () => {
                            axios.post("https://basic-paytm-api.onrender.com/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    authentication: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            navigate("/dashboard")
                        }}>
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SendMoney
