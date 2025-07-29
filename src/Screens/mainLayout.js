import React from 'react';
import Sidebar from './menus/sideBar';
import Topbar from './menus/topBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Topbar />
                <main style={{ flex: 1, padding: '20px', backgroundColor: '#f0f2f5' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;