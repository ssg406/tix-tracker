import { TicketsContainer } from '../../components';
import { Alert } from '@mui/material';
import { useAppSelector } from '../../hooks';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  const showUserAlert = useAppSelector((state) => state.user.showAlert);
  const userAlertMessage = useAppSelector((state) => state.user.alertMessage);
  const userAlertType = useAppSelector((state) => state.user.alertType);
  const showTicketAlert = useAppSelector((state) => state.tickets.showAlert);
  const ticketAlertMessage = useAppSelector(
    (state) => state.tickets.alertMessage
  );
  const ticketAlertType = useAppSelector((state) => state.tickets.alertType);

  return (
    <main className='md:container md:mx-auto p-4'>
      <h2 className='text-xl font-bold tracking-tight'>Dashboard</h2>
      <h3>Welcome {user.name}</h3>
      {showUserAlert && (
        <Alert
          sx={{ marginTop: '20px', marginBottom: '20px' }}
          severity={userAlertType}
        >
          {userAlertMessage}
        </Alert>
      )}
      {showTicketAlert && (
        <Alert
          sx={{ marginTop: '20px', marginBottom: '20px' }}
          severity={ticketAlertType}
        >
          {ticketAlertMessage}
        </Alert>
      )}
      <TicketsContainer />
    </main>
  );
};

export default Dashboard;
