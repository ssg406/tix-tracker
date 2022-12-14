import { Chip } from '@mui/material';
import { purple, red } from '@mui/material/colors';

type Props = {
  status: string;
};

const StatusTag = ({ status }: Props) => {
  const statusMap: Record<string, string> = {
    open: '#004d40',
    closed: '#1b5e20',
    cancelled: '#c62828',
    'in-progress': '#311b92',
  };

  const statusLabel = status.toUpperCase();

  return (
    <Chip
      sx={{
        fontWeight: 'fontWeightBold',
        color: statusMap[status],
        borderColor: statusMap[status],
        borderWidth: 2,
      }}
      label={statusLabel}
      variant='outlined'
    />
  );
};

export default StatusTag;
