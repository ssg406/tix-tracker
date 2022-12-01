import React, { useState } from 'react';
import { useAppContext } from '../../context';
import { TextField, Button, Alert } from '@mui/material';

const Profile = () => {
  const { user, showAlert, alertType, alertText, updateUser } = useAppContext();
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
    updateUser(formValues);
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
