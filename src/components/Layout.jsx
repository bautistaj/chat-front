import React from 'react';
import Home from '../components/Header';
const Layout = ({ children }) => (
  <div className="main">
    <Home />
      {children}
  </div>
);

export default Layout;