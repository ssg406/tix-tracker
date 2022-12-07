import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, MobileNav } from '../../components';

const SharedLayout = () => {
  //Sidebars
  //Then outlet
  //Then footer
  return (
    <div>
      <Header />
      <MobileNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;
