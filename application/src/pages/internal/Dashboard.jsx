import { TicketsContainer } from '../../components';
import { Alert } from '../../components';
import { useAppSelector } from '../../hooks';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <main className='md:container md:mx-auto p-4'>
      <h1 className='text-xl font-bold tracking-tight'>Dashboard</h1>
      <h2>Welcome {user.name}</h2>
      <Alert />
      <TicketsContainer />
    </main>
  );
};

export default Dashboard;
