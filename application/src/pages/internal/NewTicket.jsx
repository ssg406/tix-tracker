import { useAppContext } from '../../context';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, TextField } from '@mui/material';

const initialFormValues = {
  date: '',
  description: '',
};

const NewTicket = () => {
  const {
    showAlert,
    createTicket,
    alertType,
    alertText,
    isEditingTicket,
    editTicketId,
    date,
    status,
    description,
  } = useAppContext();

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialFormValues);

  if (isEditingTicket) {
    console.log({ editTicketId, date, status, description });
  }

  // Submit new ticket form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditingTicket) {
      createTicket(formValues);
    } else {
      // handle edit ticket case
    }
    navigate('/');
  };
  // Write to form state on change
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className='p-4 md:container md:mx-auto'>
      <h2 className='text-xl font-bold tracking-tight mb-6'>
        {isEditingTicket ? 'Edit Ticket' : 'Create Ticket'}
      </h2>
      {showAlert && (
        <Alert
          sx={{ marginTop: '20px', marginBottom: '20px' }}
          severity={alertType}
        >
          {alertText}
        </Alert>
      )}
      <form className='flex flex-col gap-4'>
        <TextField
          type='date'
          name='date'
          onChange={handleChange}
          variant='standard'
        />
        <TextField
          name='description'
          type='text'
          label='Description'
          variant='filled'
          onChange={handleChange}
          placeholder='Please enter a short description of the issue'
          multiline
          minRows={6}
        />
        <Button type='submit' variant='contained' onClick={handleSubmit}>
          {isEditingTicket ? 'Update Ticket' : 'Submit Ticket'}
        </Button>
      </form>
    </main>
  );
};

export default NewTicket;
