import { useAppContext } from '../../context';
import { TicketsContainer } from '../../components';
import { Alert } from '@mui/material';

const Dashboard = () => {
  const { user, showAlert, alertText, alertType } = useAppContext();

  return (
    <main className='md:container md:mx-auto p-4'>
      <h2 className='text-xl font-bold tracking-tight'>Dashboard</h2>
      <h3>Welcome {user.name}</h3>
      {showAlert && (
        <Alert
          sx={{ marginTop: '20px', marginBottom: '20px' }}
          severity={alertType}
        >
          {alertText}
        </Alert>
      )}
      <TicketsContainer />
    </main>
  );
};

export default Dashboard;
