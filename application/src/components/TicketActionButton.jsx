const TicketActionButton = ({ handleClick, buttonText }) => {
  return (
    <button
      onClick={handleClick}
      className='border-neutral-500 text-neutral-500 border-2 px-2 py-1 text-sm rounded-md uppercase font-medium'
    >
      {buttonText}
    </button>
  );
};

export default TicketActionButton;
