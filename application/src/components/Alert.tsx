import { Alert as MuiAlert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';

const Alert = () => {
  const alertType = useAppSelector((state) => state.ui.alertType);
  const alertMessage = useAppSelector((state) => state.ui.alertMessage);
  const showAlert = useAppSelector((state) => state.ui.showAlert);

  if (!showAlert) return null;
  return <MuiAlert severity={alertType}>{alertMessage}</MuiAlert>;
};

export default Alert;
