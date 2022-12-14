import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutUser, updateUser } from '../../features/users/userSlice';
import { Alert } from '../../components';
import { showAlert, hideAlert } from '../../features/ui/uiSlice';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);
  const dispatch = useAppDispatch();

  const profileFormValues = {
    name: user.name,
    email: user.email,
  };

  const [formValues, setFormValues] = useState(profileFormValues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch update function and unwrap
    try {
      await dispatch(
        updateUser({ userId: user.userId, ...formValues })
      ).unwrap();
      dispatch(
        showAlert({
          alertType: 'success',
          message: 'User updated successfully',
        })
      );
    } catch (error) {
      if (error.status === 401) {
        dispatch(logoutUser());
      }
      dispatch(showAlert({ alertType: 'error', message: error.message }));
      // Reset to initial value on error
      setFormValues(profileFormValues);
    }
    setTimeout(() => dispatch(hideAlert()), 3000);
  };
  return (
    <main className='p-4 md:container md:mx-auto'>
      <h2 className='text-xl font-bold tracking-tight mb-6'>
        Account Information
      </h2>
      <Alert />
      {status === 'loading' && <CircularProgress />}
      <form className='flex flex-col gap-6 mt-6'>
        <TextField
          name='name'
          type='text'
          onChange={handleChange}
          value={formValues.name}
          variant='standard'
        />
        <TextField
          name='email'
          type='email'
          onChange={handleChange}
          value={formValues.email}
          variant='standard'
        />
        <Button type='submit' onClick={handleSubmit} variant='contained'>
          Save Changes
        </Button>
      </form>
    </main>
  );
};

export default Profile;
