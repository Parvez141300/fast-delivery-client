import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/shared/NavBar.jsx/NavBar';

const RootLayout = () => {
    return (
        <div>
            {/* navbar */}
            <nav className='bg-base-100 shadow-sm'>
                <NavBar></NavBar>
            </nav>
            {/* for routing purpose */}
            <main className='w-10/12 mx-auto my-8'>
                <Outlet></Outlet>
            </main>
            {/* footer */}
            <footer>

            </footer>
        </div>
    );
};

export default RootLayout;