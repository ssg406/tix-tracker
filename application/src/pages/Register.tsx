import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo_svg.svg';
import { useAppContext } from '../context';
import { Button, TextField, Alert } from '@mui/material';

const formValues = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  isMember: false,
  formError: false,
  formErrorMessage: '',
};

const Register = () => {
  const [formState, setFormState] = useState(formValues);
  const { isLoading, showAlert, registerUser, user, alertText, alertType } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // Set formState using dynamic key from event
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    // Call async function with either /login or /register endpoint
    if (formState.isMember) {
      registerUser({
        formState,
        endpoint: 'login',
        alertText: 'Signed in successfully!',
      });
      setFormState({
        ...formState,
        password: '',
      });
    } else {
      registerUser({
        formState,
        endpoint: 'register',
        alertText: 'User registered successfully!',
      });
      setFormState({
        ...formState,
        password: '',
        confirm: '',
      });
    }
  };

  // Toggles form between login and register modes
  const toggleForm = () => {
    setFormState({ ...formState, isMember: !formState.isMember });
  };

  // Navigate to root if user exists in context
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Monitor password confirm field for match validation
  useEffect(() => {
    if (formState.password !== formState.confirm && (formState.password.length > 5 && formState.confirm.length > 5)) {
      setFormState({...formState, formError: true, formErrorMessage: 'Passwords do not match'})
    } else {
      setFormState({...formState, formError: false, formErrorMessage: ''})
    }
  }, [formState.password, formState.confirm])

  return (
    <div className='md:container md:mx-auto md:max-w-lg p-4 flex flex-col gap-6 items-center justify-center  h-screen'>
      <img className='h-16 md:h-24' src={Logo} alt='trakr logo' />
      <h2 className='text-xl font-medium tracking-tight'>
        {formState.isMember ? 'Login' : 'Create Account'}
      </h2>
      {showAlert && <Alert severity={alertType}>{alertText}</Alert>}
      <form className='w-full p-2 flex flex-col gap-6 md:p-8 md:bg-slate-100 md:rounded-xl'>
        {/* Name field displays only if member toggle is false */}
        {!formState.isMember && (
          <TextField
            variant='standard'
            onChange={handleChange}
            type='text'
            value={formState.name}
            label='Name'
            name='name'
          />
        )}
        <TextField
          variant='standard'
          onChange={handleChange}
          type='email'
          value={formState.email}
          label='Email'
          name='email'
        />

        <TextField
          variant='standard'
          name='password'
          type='password'
          label='Password'
          value={formState.password}
          onChange={handleChange}
          error={formState.formError}
        />
        {!formState.isMember && (
          <TextField
            variant='standard'
            name='confirm'
            type='password'
            error={formState.formError}
            label='Confirm Password'
            value={formState.confirm}
            onChange={handleChange}
            helperText={formState.formError && formState.formErrorMessage}
          />
        )}
        <Button variant='contained' type='submit' onClick={handleSubmit} disabled={isLoading}>
          {formState.isMember ? 'Login' : 'Register'}
        </Button>
      </form>
      <p className=''>
        {formState.isMember ? 'No account yet? ' : 'Registered already? '}
        {/* <button onClick={toggleForm} className='font-bold text-slate-700'>
          {formState.isMember ? 'Register' : 'Login'}
        </button> */}
        <Button variant='text' onClick={toggleForm}>
          {formState.isMember ? 'Register' : 'Login'}
        </Button>
      </p>
    </div>
  );
};

export default Register;
