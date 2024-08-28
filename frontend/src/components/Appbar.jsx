import React from 'react'
import DropdownButton from './DropdownBtn'

const Appbar = () => {
    return (
        <div className='flex shadow-sm justify-between shadow-gray-600 w-full px-10 items-center py-2 rounded-md border-t-2'>
            <div className="flex font-semibold text-xl">
                PayTM App
            </div>
            <div className='flex gap-10 items-center'>
                <div className='flex'>Hello</div>
                <div className='flex rounded-full bg-indigo-400 w-12 h-12 items-center justify-center'>
                    <DropdownButton />
                </div>
            </div>
        </div>
    )
}

export default Appbar
