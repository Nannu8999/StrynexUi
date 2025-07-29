import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const linkStyle = ({ isActive }) => ({
        padding: '12px 20px',
        display: 'block',
        color: 'white',
        textDecoration: 'none'

    });

    return (
        <aside style={{ width: '220px', background: '#343a40', color: 'white', height: '100vh' }}>

            <h2 style={{ padding: '20px', margin: 0 }}>Strynex</h2>

            <nav>
                <NavLink to="/" style={linkStyle} end>Dashboard</NavLink>
                <NavLink to="/userListing" style={linkStyle}>User</NavLink>
            </nav>

        </aside>
    );
};

export default Sidebar;
