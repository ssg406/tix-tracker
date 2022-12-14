import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main className='h-screen'>
      <div className='h-1/2 flex items-end px-6 py-2 '>
        <img src={Logo} alt='Trakr logo' className='h-16 md:h-32' />
      </div>
      <div className='h-1/2 bg-neutral-800 px-6 py-2'>
        <h1 className='text-xl font-medium tracking-tight text-neutral-100 md:text-3xl'>
          Easy ticket tracking for your small organization
        </h1>
        <div className='flex my-6'>
          <Link
            className='text-sky-300 font-bold border-b-2 border-sky-300 hover:text-sky-500 hover:border-sky-600'
            to='/register'
          >
            Create a Demo Account
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
