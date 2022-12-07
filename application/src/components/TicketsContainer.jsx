import React, { useEffect } from 'react';
import TicketRow from './TicketRow';
import { Stack, CircularProgress, Alert } from '@mui/material';
import { useGetTicketsQuery } from '../features/api/apiSlice';
import { useAppDispatch } from '../hooks';

const TicketsContainer = () => {
  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useGetTicketsQuery();
  const dispatch = useAppDispatch();
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
    <Alert severity='error'>{error.data.message}</Alert>;
  } else if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <CircularProgress />
      </div>
    );
  }
};

export default TicketsContainer;
