import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/tickets',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Ticket'],
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => '/all/?sort=newest&status=all',
      providesTags: ['Ticket'],
    }),
    addNewTicket: builder.mutation({
      query: (initialTicket) => ({
        url: '/new',
        method: 'POST',
        body: initialTicket,
      }),
      invalidatesTags: ['Ticket'],
    }),
    cancelTicket: builder.mutation({
      query: (ticketId) => ({
        url: `/cancel/${ticketId}`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: ['Ticket'],
    }),
    updateTicket: builder.mutation({
      query: (ticketObj) => ({
        url: '/update',
        method: 'PATCH',
        body: ticketObj,
      }),
      invalidatesTags: ['Ticket'],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useAddNewTicketMutation,
  useCancelTicketMutation,
  useUpdateTicketMutation,
} = apiSlice;
