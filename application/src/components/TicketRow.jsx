import StatusTag from './StatusTag';
import { GrMore } from 'react-icons/gr';
import { useState } from 'react';
import { TicketActionButton } from '../components';

const TicketRow = ({ status, description, ticketId }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className='grid grid-cols-[1fr_3fr] grid-rows-1 border-b border-neutral-200'>
      <div className=' px-4 py-4'>
        <StatusTag status={status} />
      </div>

      <div className='px-4 py-2'>
        <p className=''>{description}</p>
        <div className='flex justify-end'>
          <button onClick={() => setShowOptions(!showOptions)}>
            <GrMore className='text-2xl' />
          </button>
        </div>
        <div
          className={`${
            showOptions ? 'block' : 'hidden'
          } flex justify-start gap-4`}
        >
          <TicketActionButton buttonText='edit' />
          <TicketActionButton buttonText='cancel' />
        </div>
      </div>
    </div>
  );
};

export default TicketRow;
