import { Link } from 'react-router-dom';
import { useAppContext } from '../context';
import { navigationLinks } from '../data';

const MobileNav = () => {
  const { showMobileNav, logoutUser } = useAppContext();

  return (
    <nav
      className={`w-full bg-slate-200 md:hidden ${
        showMobileNav ? 'block' : 'hidden'
      }`}
    >
      <ul className='font-medium font-heading text-center'>
        {navigationLinks.map(({ text, path, id }) => {
          return (
            <li key={id} className='p-2 border-b border-slate-300'>
              <Link to={path}>{text}</Link>
            </li>
          );
        })}
        <li>
          <button onClick={logoutUser} className='p-2'>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
