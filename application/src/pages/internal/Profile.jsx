import React, { useState } from 'react';
import { useAppContext } from '../../context';
import { TextField, Button, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateUser } from '../../features/users/userSlice';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const showAlert = useAppSelector((state) => state.ui.showAlert);
  const alertType = useAppSelector((state) => state.ui.alertType);
  const alertMessage = useAppSelector((state) => state.ui.alertMessage);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId: user.userId, ...formValues }));
  };
  return (
    <main className='p-4 md:container md:mx-auto'>
      <h2 className='text-xl font-bold tracking-tight mb-6'>
        Account Information
      </h2>
      {showAlert && <Alert severity={alertType}>{alertText}</Alert>}
      <form className='flex flex-col gap-6'>
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
