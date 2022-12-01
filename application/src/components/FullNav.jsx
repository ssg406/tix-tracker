import React from 'react';
import { Link } from 'react-router-dom';
import { navigationLinks } from '../data';

const FullNav = () => {
  return (
    <nav className='flex gap-6 font-medium text-neutral-100 uppercase '>
      {navigationLinks.map(({ id, path, text }) => {
        return (
          <Link
            className='hover:text-cyan-600 transition-colors'
            to={path}
            key={id}
          >
            {text}
          </Link>
        );
      })}
      <button className='uppercase'>Logout</button>
    </nav>
  );
};

export default FullNav;
