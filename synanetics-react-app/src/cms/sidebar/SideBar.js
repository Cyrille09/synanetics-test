import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiCodesandbox, FiUsers, FiGlobe, FiUser, FiBox } from 'react-icons/fi';

function SideBar() {
  return (
    <div className="small-sizes">
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/cms/dashboard" className="brand-link">
          <img
            className="flavicon-image"
            src="/images/placeholders/placeholder.png"
            width="25"
            height="25"
            alt=""
          />
          <span className="brand-text font-weight-light">Synanetics</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item active">
                <NavLink to="/cms/dashboard" className="nav-link">
                  <i className="nav-icon">
                    <FiBox />
                  </i>
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item bashvoard-nav">
                <NavLink to="/cms/user/profile" className="nav-link">
                  <i className="nav-icon">
                    <FiUser />
                  </i>
                  <p>Profile</p>
                </NavLink>
              </li>
              <li className="nav-item bashvoard-nav">
                <NavLink to="/cms/users" className="nav-link">
                  <i className="nav-icon">
                    <FiUsers />
                  </i>
                  <p>Users</p>
                </NavLink>
              </li>
              <li className="nav-item bashvoard-nav">
                <NavLink to="/cms/products" className="nav-link">
                  <i className="nav-icon">
                    <FiCodesandbox />
                  </i>
                  <p>Products</p>
                </NavLink>
              </li>

              <li className="nav-item bashvoard-nav">
                <Link to="/" className="nav-link">
                  <i className="nav-icon">
                    <FiGlobe />
                  </i>
                  <p>Website</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      {/* Content Wrapper. Contains page content */}
    </div>
  );
}
export default SideBar;
