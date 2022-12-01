import React, { useEffect } from 'react';
import { useAppContext } from '../context';
import TicketRow from './TicketRow';

const TicketsContainer = () => {
  const { getAllTickets, tickets, showAlert, alertText, alertType } =
    useAppContext();

  useEffect(() => {
    getAllTickets();
  }, [tickets]);

  return (
    <section className='grid grid-cols-1 border-neutral-400 border rounded-md'>
      {tickets.length === 0 ? (
        <h3 className='text-center text-xl font-medium my-20'>
          No tickets found
        </h3>
      ) : (
        tickets.map(({ _id, description, status, date }) => {
          return (
            <TicketRow
              key={_id}
              description={description}
              status={status}
              ticketId={_id}
              date={date}
            />
          );
        })
      )}
    </section>
  );
};

export default TicketsContainer;
