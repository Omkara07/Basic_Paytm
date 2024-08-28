import React from 'react'

const Balance = ({ value, user }) => {

    return (
        <div className='flex flex-col gap-5 pt-10'>
            <div className='flex px-10  gap-10 font-bold'>
                <div className="flex">Username  :</div>
                <div className="flex">{user.username}</div>
            </div>
            <div className='flex px-10 gap-10 font-bold'>
                <div className="flex">User ID  :</div>
                <div className="flex">{user.userId}</div>
            </div>
            <div className='flex px-10 gap-10 font-bold'>
                <div className="flex">Your Balance  :</div>
                <div className="flex">Rs {Math.round(value * 100) / 100}</div>
            </div>
        </div>
    )
}

export default Balance
