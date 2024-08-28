import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DropdownButton = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="inline-flex justify-center items-center w-12 text-lg font-bold text-white h-12 "
            >
                U
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-3 w-36 justify-center rounded-md shadow-lg bg-slate-200 ring-1 ring-black ring-opacity-5 font-bold">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {/* <Link
                            to="/dashboard"
                            className="block px-auto text-center py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        >
                            Dashboard
                        </Link> */}
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/signin")
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;