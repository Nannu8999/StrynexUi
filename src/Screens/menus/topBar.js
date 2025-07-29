import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../../redux/slices/authSlice";

const Topbar = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogOut = () => {
        dispatch(clearAuthData());
        navigate('/');
    }


    return (
        <header style={{ height: '60px', background: '#ffffff', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
            <h3 style={{ margin: 0 }}>Dashboard</h3>
            <div>
                <span style={{ fontSize: '14px', color: '#666' }}>Welcome, User</span>
                <button style={{ marginLeft: '10px', borderRadius: '5px' }} onClick={handleLogOut}  ><span style={{ fontSize: '14px', color: '#666' }}>Log out</span></button>
            </div>
        </header>
    );
};

export default Topbar;
