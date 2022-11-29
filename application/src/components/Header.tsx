import React from "react";
import Logo from "../assets/logo_light.svg";
import { FiMenu } from "react-icons/fi";
import { useAppContext } from "../context";
import { Drawer } from '@mui/material';

const Header = () => {
  const { toggleMobileNav } = useAppContext();
  return (
    <header className="bg-neutral-900 w-full h-20 md:h-24 p-4 flex justify-between items-center">
      <div>
        <img src={Logo} alt="Trakr Logo" className="h-10 md:h-12" />
      </div>
      <div className="md:hidden">
        <button onClick={toggleMobileNav}>
          <FiMenu className="text-neutral-300 text-4xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
