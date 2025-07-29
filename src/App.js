import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/login/login';
import MainLayout from './screens/mainLayout';
import Dashboard from './screens/dashboard';
import { useSelector } from 'react-redux';
import UserListing from './screens/user/userListing';
import AddUser from './screens/user/addUser';
import ViewUser from './screens/user/viewUser';

function App() {

  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />


        {/* Protected Route with Layout */}
        {token && (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="userListing" element={<UserListing />} />
            <Route path="addUser" element={<AddUser />} />
            <Route path="viewUser/:userId" element={<ViewUser />} />
          </Route>
        )}


        {/* Catch-all */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} replace />} />

      </Routes>
    </Router>
  );
}



export default App;
