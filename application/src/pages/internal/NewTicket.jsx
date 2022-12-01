import { useAppContext } from '../../context';
import React, { useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';

const initialFormValues = {
  date: '',
  description: '',
};

const NewTicket = () => {
  const { showAlert, createTicket, alertType, alertText } = useAppContext();

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket(formValues);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className='p-4'>
      <h2 className='text-xl font-bold tracking-tight mb-6'>Create Ticket</h2>
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
          Submit Ticket
        </Button>
      </form>
    </main>
  );
};

export default NewTicket;
