import Sidebar from '../menus/sideBar';
import Topbar from '../menus/topBar';
import { Outlet } from 'react-router-dom';
import { CContainer } from '@coreui/react';

const MainLayout = () => {
    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar with fixed width */}
            <div style={{ width: '70px', flexShrink: 0 }}>
                <Sidebar />
            </div>

            {/* Right content area */}
            <div className="flex-grow-1 d-flex flex-column">
                <Topbar />

                <main className="flex-grow-1" style={{ backgroundColor: '#f0f2f5' }}>
                    <CContainer fluid className="py-4">
                        <Outlet />
                    </CContainer>
                </main>

            </div>
        </div>
    );
};

export default MainLayout;
