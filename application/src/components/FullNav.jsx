import React from 'react';
import { Link } from 'react-router-dom';
import { navigationLinks } from '../data';
import { useAppDispatch } from '../hooks';
import { logoutUser } from '../features/users/userSlice';

const FullNav = () => {
  const dispatch = useAppDispatch();
  return (
    <nav
      className='flex gap-6 font-medium text-neutral-100 uppercase'
      aria-label='primary navigation'
    >
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
      <button onClick={() => dispatch(logoutUser())} className='uppercase'>
        Logout
      </button>
    </nav>
  );
};

export default FullNav;
