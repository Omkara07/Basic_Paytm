import React from 'react'

const Button = ({ text, onClick }) => {
    return (
        <div className='flex w-full justify-center items-center' onClick={onClick}>
            <button type="button" className="flex justify-center w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{text}</button>
        </div>
    )
}

export default Button
