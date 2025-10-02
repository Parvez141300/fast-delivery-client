import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            {/* navbar */}
            <nav>

            </nav>
            {/* for routing purpose */}
            <main>
                <Outlet></Outlet>
            </main>
            {/* footer */}
            <footer>

            </footer>
        </div>
    );
};

export default RootLayout;