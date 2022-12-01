import React from 'react';
import Logo from '../assets/logo_light.svg';
import { FiMenu } from 'react-icons/fi';
import { useAppContext } from '../context';
import { Drawer } from '@mui/material';
import { FullNav } from '../components';

const Header = () => {
  const { toggleMobileNav } = useAppContext();
  return (
    <div className='bg-neutral-900 w-full h-20 md:h-24 p-4'>
      <header className='md:container md:mx-auto flex justify-between items-center md:items-end'>
        <div>
          <img src={Logo} alt='Trakr Logo' className='h-10 md:h-12' />
        </div>
        <div className='md:hidden'>
          <button onClick={toggleMobileNav}>
            <FiMenu className='text-neutral-300 text-4xl' />
          </button>
        </div>
        <div className='hidden md:block'>
          <FullNav />
        </div>
      </header>
    </div>
  );
};

export default Header;
