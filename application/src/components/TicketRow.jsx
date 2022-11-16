import StatusTag from "./StatusTag";

const TicketRow = ({ status, description }) => {
  return (
    <div className="grid grid-cols-[1fr_3fr] grid-rows-1">
      <div className=" px-4 py-4 border-b border-neutral-200">
        <StatusTag status={status} />
      </div>
      <div className=" px-4 py-2 border-b border-neutral-200">
        {description}
      </div>
    </div>
  );
};

export default TicketRow;
