import { Chip } from '@mui/material';

type Props = {
  status: string;
};

const StatusTag = ({ status }: Props) => {
  const statusMap: Record<string, string> = {
    open: 'info',
    closed: 'success',
    cancelled: 'warning',
    'in-progress': 'info',
  };

  const statusLabel = status.toUpperCase();

  return <Chip label={statusLabel} color={statusMap[status]} />;
};

export default StatusTag;
