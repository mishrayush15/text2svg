import React, { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
    const [showLogout, setShowLogout] = useState(false);

    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    return (
        <div className="w-full z-50 h-14 bg-black flex items-center justify-between px-4">

            <h1 className="text-white text-lg">Hello, {user?.displayName || 'User'}</h1>


            <div className="relative">
                <img
                    src={user?.photoURL || '/user.png'}
                    alt="profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={toggleLogout}
                />

                {showLogout && (
                    <button
                        className="absolute right-0 mt-6 mr-7 w-24 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 hidden sm:block"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                )}
            </div>


            {showLogout && (
                <div
                    className="sm:hidden fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
                    onClick={toggleLogout}
                >
                    <button
                        className="w-36 py-3 bg-red-500 text-white rounded-md shadow-lg text-lg hover:bg-red-600"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
