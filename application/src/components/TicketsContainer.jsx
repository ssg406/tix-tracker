import React, { useEffect } from 'react';
import TicketRow from './TicketRow';
import { Stack, CircularProgress, Alert } from '@mui/material';
import { useGetTicketsQuery } from '../features/api/apiSlice';

const TicketsContainer = () => {
  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useGetTicketsQuery();
  if (isSuccess) {
    return (
      <section className={`{isFetching && opacity-80}`}>
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
  } else if (isError) {
    return <div>{error.toString}</div>;
  } else if (isLoading) {
    return <div>Loading</div>;
  }
};

export default TicketsContainer;
