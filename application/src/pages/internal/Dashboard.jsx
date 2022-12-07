import { TicketsContainer } from '../../components';
import { Alert } from '../../components';
import { useAppSelector } from '../../hooks';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <main className='md:container md:mx-auto p-4'>
      <h2 className='text-xl font-bold tracking-tight'>Dashboard</h2>
      <h3>Welcome {user.name}</h3>
      <Alert />
      <TicketsContainer />
    </main>
  );
};

export default Dashboard;
