import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/loginPages/Login.js';
import MainLayout from './screens/mainPages/MainLayout.js';
import Dashboard from './screens/mainPages/Dashboard.js';
import { useSelector } from 'react-redux';
import UserListing from './screens/userPages/UserListing.js';
import AddUser from './screens/userPages/AddUser.js';
import ViewUser from './screens/userPages/ViewUser.jsx';
import CourseCatalogue from './screens/courseCatalogue/CourseCatalogue.js';
import TakeCourse from './screens/courseCatalogue/TakeCourse.js';
import GlobalToastContainer from './screens/toasters/GlobalToastContainer.js';

function App() {

  const token = useSelector((state) => state.auth.token);


  return (
    <Router>

      <GlobalToastContainer />

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


            <Route path="courseCatalogue" element={<CourseCatalogue />} />
            <Route path="takeCourse" element={<TakeCourse />} />

          </Route>
        )}


        {/* Catch-all */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} replace />} />

      </Routes>
    </Router>
  );
}



export default App;
