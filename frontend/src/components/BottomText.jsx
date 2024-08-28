import React from 'react'
import { Link } from 'react-router-dom'

const BottomText = ({ text, to, btnText }) => {
    return (
        <div className='flex gap-3 p-6  '>
            <div>
                {text}
            </div>
            <Link className='text-blue-500 font-bold' to={to}>
                {btnText}
            </Link>
        </div>
    )
}

export default BottomText
