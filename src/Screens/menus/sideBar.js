import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavItem,
    CNavTitle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilUser, cilMenu, cilLibrary } from '@coreui/icons';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';

export default function SideBar() {

    const [isCollapsed, setIsCollapsed] = useState(true);


    const handleMouseEnterAndLeave = () => {
        setIsCollapsed((prev) => !prev)
    }

    return (
        <CSidebar
            className="border-end"
            unfoldable
            style={{
                backgroundColor: '#F9FAFB',
                color: '#000',
            }}
            onMouseEnter={handleMouseEnterAndLeave}
            onMouseLeave={handleMouseEnterAndLeave}
        >
            <CSidebarHeader className="border-bottom" style={{ background: '#E0F7FA' }}>
                <CSidebarBrand style={{ color: '#007BFF', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {isCollapsed ? <CIcon icon={cilMenu} size="lg" /> : 'CUI'}
                </CSidebarBrand>
            </CSidebarHeader>

            <CSidebarNav>
                {!isCollapsed && (
                    <CNavTitle style={{ color: '#374151', fontWeight: 600, letterSpacing: '0.12em' }}>
                        Navigation
                    </CNavTitle>
                )}

                <CNavItem>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            'nav-link d-flex align-items-center px-3 py-2' + (isActive ? ' active fw-bold' : '')
                        }
                        style={({ isActive }) => ({
                            color: isActive ? '#fff' : '#000',
                            background: isActive ? '#007BFF' : 'transparent',
                            borderRadius: '6px',
                            marginBottom: '4px',
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                        })}
                    >
                        <CIcon icon={cilSpeedometer} className="me-2" />
                        {!isCollapsed && 'Dashboard'}
                    </NavLink>
                </CNavItem>

                <CNavItem>
                    <NavLink
                        to="/userListing"
                        className={({ isActive }) =>
                            'nav-link d-flex align-items-center px-3 py-2' + (isActive ? ' active fw-bold' : '')
                        }
                        style={({ isActive }) => ({
                            color: isActive ? '#fff' : '#000',
                            background: isActive ? '#007BFF' : 'transparent',
                            borderRadius: '6px',
                            marginBottom: '4px',
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                        })}
                    >
                        <CIcon icon={cilUser} className="me-2" />
                        {!isCollapsed && 'Users'}
                    </NavLink>
                </CNavItem>


                <CNavItem>
                    <NavLink
                        to="/courseCatalogue"
                        className={({ isActive }) =>
                            'nav-link d-flex align-items-center px-3 py-2' + (isActive ? ' active fw-bold' : '')
                        }
                        style={({ isActive }) => ({
                            color: isActive ? '#fff' : '#000',
                            background: isActive ? '#007BFF' : 'transparent',
                            borderRadius: '6px',
                            marginBottom: '4px',
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                        })}
                    >
                        <CIcon icon={cilLibrary} className="me-2" />
                        {!isCollapsed && 'Course Catalogue'}
                    </NavLink>
                </CNavItem>


            </CSidebarNav>
        </CSidebar>
    );
}
