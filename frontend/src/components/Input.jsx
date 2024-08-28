import React from 'react'

const Input = ({ label, onChange, placeholder, type }) => {
    return (
        <div className="flex flex-col pt-8 w-[70%]">
            <div className='flex font-semibold'>{label}</div>
            <input className='border-[1px] border-black rounded-md p-1' type={type ? type : "text"} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export default Input
