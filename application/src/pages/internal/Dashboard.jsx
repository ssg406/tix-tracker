import React from 'react';
import { useAppContext } from '../../context';
import { TicketRow } from '../../components';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, getAllTickets, tickets } = useAppContext();

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <main className='md:container md:mx-auto p-4'>
      <h2 className='text-xl font-bold tracking-tight'>Dashboard</h2>
      <h3>Welcome {user.name}</h3>
      {tickets.length === 0 ? (
        <h3 className='text-center text-xl font-medium my-20'>
          No tickets found
        </h3>
      ) : (
        <section className='grid grid-cols-1 border-neutral-400 border rounded-md'>
          {tickets.map(({ _id, description, status }) => {
            return (
              <TicketRow key={_id} description={description} status={status} />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Dashboard;
