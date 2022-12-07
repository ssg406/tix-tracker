import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import {
  useAddNewTicketMutation,
  useUpdateTicketMutation,
} from '../../features/api/apiSlice';
import { showAlert, hideAlert } from '../../features/ui/uiSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Alert } from '../../components';
import { cancelEditTicket } from '../../features/tickets/ticketsSlice';

const initialFormValues = {
  date: '',
  description: '',
};

const NewTicket = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  // Tracks editing state within the component outside of Redux store
  const [isEditing, setIsEditing] = useState({ flag: false, id: '' });
  const [addNewTicket, { addIsLoading }] = useAddNewTicketMutation();
  const [updateTicket, { updatingIsLoading }] = useUpdateTicketMutation();
  const editingTicketId = useAppSelector(
    (state) => state.tickets.editingTicketId
  );
  const editingTicketDescription = useAppSelector(
    (state) => state.tickets.editingTicketDescription
  );
  const editingTicketDate = useAppSelector(
    (state) => state.tickets.editingTicketDate
  );
  const isEditingTicket = useAppSelector(
    (state) => state.tickets.isEditingTicket
  );
  const dispatch = useAppDispatch();

  // Check the redux store on render to see if ticket is being edited
  useEffect(() => {
    if (isEditingTicket) {
      // Set local component state to track ticket editing details
      setIsEditing({ flag: true, id: editingTicketId });
      setFormValues({
        date: editingTicketDate.substring(0, 10),
        description: editingTicketDescription,
      });
      // Clear the redux store of ticket editing details. Page will show as new ticket form
      // if user navigates away without hitting submit
      dispatch(cancelEditTicket());
    } else {
      setFormValues(initialFormValues);
    }
  }, []);

  // Submit new ticket form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the editing case
    if (isEditing.flag) {
      try {
        await updateTicket({
          _id: isEditing.id,
          date: formValues.date,
          description: formValues.description,
        }).unwrap();
        setFormValues(initialFormValues);
        navigate('/');
      } catch (error) {
        dispatch(
          showAlert({ alertType: 'error', message: error.data.message })
        );
      }
      // Handle the new ticket case
    } else {
      try {
        await addNewTicket(formValues).unwrap();
        setFormValues(initialFormValues);
        navigate('/');
      } catch (error) {
        dispatch(
          showAlert({ alertType: 'error', message: error.data.message })
        );
      }
    }
    // Clear any alerts displayed
    setTimeout(() => dispatch(hideAlert()), 3000);
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
        {isEditing.flag ? 'Edit Ticket' : 'Create Ticket'}
      </h2>
      <Alert />
      <form className='flex flex-col gap-4'>
        <TextField
          value={formValues.date}
          type='date'
          name='date'
          onChange={handleChange}
          variant='standard'
        />
        <TextField
          value={formValues.description}
          name='description'
          type='text'
          label='Description'
          variant='filled'
          onChange={handleChange}
          placeholder='Please enter a short description of the issue'
          multiline
          minRows={6}
        />
        <Button
          disabled={addIsLoading || updatingIsLoading}
          type='submit'
          variant='contained'
          onClick={handleSubmit}
        >
          {isEditing.flag ? 'Update Ticket' : 'Submit Ticket'}
        </Button>
      </form>
    </main>
  );
};

export default NewTicket;
