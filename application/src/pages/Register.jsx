import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo_svg.svg';
import { Alert } from '../components';
import { Button, TextField, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginUser, registerUser } from '../features/users/userSlice';
import { showAlert, hideAlert } from '../features/ui/uiSlice';

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
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);
  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    // Set formState using dynamic key from event
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call async function with either /login or /register endpoint
    if (formState.isMember) {
      try {
        await dispatch(loginUser(formState)).unwrap();
        setFormState({
          ...formState,
          password: '',
        });
      } catch (error) {
        dispatch(showAlert({ alertType: 'error', message: error.message }));
      }
    } else {
      try {
        await dispatch(registerUser(formState)).unwrap();
        setFormState({
          ...formState,
          password: '',
          confirm: '',
        });
      } catch (error) {
        dispatch(showAlert({ alertType: 'error', message: error.message }));
      }
    }
    setTimeout(() => dispatch(hideAlert()), 3000);
  };
  // Toggles form between login and register modes
  const toggleForm = () => {
    setFormState({ ...formState, isMember: !formState.isMember });
  };

  // Navigate to root if user exists in state
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  // Monitor password confirm field for match validation
  useEffect(() => {
    if (
      formState.password !== formState.confirm &&
      formState.password.length > 5 &&
      formState.confirm.length > 5
    ) {
      setFormState({
        ...formState,
        formError: true,
        formErrorMessage: 'Passwords do not match',
      });
    } else {
      setFormState({ ...formState, formError: false, formErrorMessage: '' });
    }
  }, [formState.password, formState.confirm]);

  return (
    <div className='md:container md:mx-auto md:max-w-lg p-4 flex flex-col gap-6 items-center justify-center  h-screen'>
      <img className='h-16 md:h-24' src={Logo} alt='trakr logo' />
      <h1 className='text-xl font-medium tracking-tight'>
        {formState.isMember ? 'Login' : 'Create Account'}
      </h1>
      {status === 'loading' && <CircularProgress />}
      <Alert />
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
        <Button
          variant='contained'
          type='submit'
          onClick={handleSubmit}
          disabled={status === 'loading'}
        >
          {formState.isMember ? 'Login' : 'Register'}
        </Button>
      </form>
      <p className=''>
        {formState.isMember ? 'No account yet? ' : 'Registered already? '}
        <Button variant='text' onClick={toggleForm}>
          {formState.isMember ? 'Register' : 'Login'}
        </Button>
      </p>
    </div>
  );
};

export default Register;
