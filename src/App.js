import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/loginPages/login';
import MainLayout from './screens/mainPages/mainLayout';
import Dashboard from './screens/mainPages/dashboard';
import { useSelector } from 'react-redux';
import UserListing from './screens/userPages/userListing.js';
import AddUser from './screens/userPages/addUser';
import ViewUser from './screens/userPages/viewUser';
import CourseCatalogue from './screens/courseCatalogue/courseCatalogue.js';
import TakeCourse from './screens/courseCatalogue/takeCourse.js';
import GlobalToastContainer from './screens/toasters/globalToastContainer';

function App() {

  const token = useSelector((state) => state.auth.token);

  console.log('token   ', token);

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
