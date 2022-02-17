import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './pages/main.css';
import './cms/cms.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

// front end routes
import AddUserFrontend from './pages/users';
import UserProfileFrontend from './pages/users/profile';
import SignIn from './pages/users/signIn';
import Home from './pages/index';
import Basket from './pages/basket';
import ProfileUserFrontend from './pages/users/profile';
import ProfileUserEditFrontend from './pages/users/profile/edit';
import ProfileUserEditImageFrontend from './pages/users/profile/editPicture';
import ProfileUserChangePasswordFrontend from './pages/users/profile/changePassword';

// cms routes
import Dashboard from './cms/pages/dashboard';
import UsersList from './cms/pages/users';
import AddUser from './cms/pages/users/add';
import EditUser from './cms/pages/users/edit';
import ProfileUserCMS from './cms/pages/users/profile';
import ProfileUserEditCMS from './cms/pages/users/profile/edit';
import ProfileUserEditImageCMS from './cms/pages/users/profile/editPicture';
import ProfileUserChangePasswordCMS from './cms/pages/users/profile/changePassword';

import ProductsList from './cms/pages/products';
import AddProduct from './cms/pages/products/add';
import EditProduct from './cms/pages/products/edit';

// Layout route
import FrontendLayout from './components/pageLayout/FrontendLayout';
import DashboardLayout from './components/pageLayout/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Frontend route */}
        <Route exact path="/" element={<FrontendLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/basket" element={<FrontendLayout />}>
          <Route index element={<Basket />} />
        </Route>
        <Route path="/sign-in" element={<FrontendLayout />}>
          <Route index element={<SignIn />} />
        </Route>
        <Route path="/profile" element={<FrontendLayout />}>
          <Route index element={<UserProfileFrontend />} />
        </Route>
        <Route path="/user/profile" element={<FrontendLayout />}>
          <Route index element={<ProfileUserFrontend />} />
        </Route>
        <Route path="/edit-user/profile/edit" element={<FrontendLayout />}>
          <Route index element={<ProfileUserEditFrontend />} />
        </Route>
        <Route
          path="/picture-user/profile/editPicture"
          element={<FrontendLayout />}
        >
          <Route index element={<ProfileUserEditImageFrontend />} />
        </Route>
        <Route
          path="/password-user/profile/change-password"
          element={<FrontendLayout />}
        >
          <Route index element={<ProfileUserChangePasswordFrontend />} />
        </Route>

        {/* CMS route */}
        <Route path="/cms/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/cms/users" element={<DashboardLayout />}>
          <Route index element={<UsersList />} />
        </Route>
        <Route path="/cms/users/add" element={<DashboardLayout />}>
          <Route index element={<AddUser />} />
        </Route>
        <Route path="/cms/users/edit/:id" element={<DashboardLayout />}>
          <Route index element={<EditUser />} />
        </Route>

        <Route path="/cms/products" element={<DashboardLayout />}>
          <Route index element={<ProductsList />} />
        </Route>
        <Route path="/cms/products/add" element={<DashboardLayout />}>
          <Route index element={<AddProduct />} />
        </Route>
        <Route path="/cms/products/edit/:id" element={<DashboardLayout />}>
          <Route index element={<EditProduct />} />
        </Route>

        <Route path="/cms/user/profile" element={<DashboardLayout />}>
          <Route index element={<ProfileUserCMS />} />
        </Route>
        <Route path="/cms/edit-user/profile/edit" element={<DashboardLayout />}>
          <Route index element={<ProfileUserEditCMS />} />
        </Route>
        <Route
          path="/cms/picture-user/profile/editPicture"
          element={<DashboardLayout />}
        >
          <Route index element={<ProfileUserEditImageCMS />} />
        </Route>
        <Route
          path="/cms/password-user/profile/change-password"
          element={<DashboardLayout />}
        >
          <Route index element={<ProfileUserChangePasswordCMS />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
