import React, { useEffect } from 'react';
import TicketRow from './TicketRow';
import { Stack, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loadTickets } from '../features/tickets/ticketsSlice';
import { ticketsSelectors } from '../features/tickets/ticketsSlice';

const TicketsContainer = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tickets.status);
  const tickets = useAppSelector(ticketsSelectors.selectAll);

  useEffect(() => {
    dispatch(loadTickets());
  }, []);

  if (loading === 'idle') {
    return (
      <section>
        <Stack spacing={2}>
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
        </Stack>
      </section>
    );
  } else {
    return (
      <div className='flex justify-center items-center'>
        <CircularProgress />
      </div>
    );
  }
};

export default TicketsContainer;
