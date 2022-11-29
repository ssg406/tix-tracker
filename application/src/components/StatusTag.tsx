type Props = {
  status: string,
}

const StatusTag = ({ status }: Props) => {
  let tagBackground: string;
  if (status === "open") {
    tagBackground = "bg-slate-400";
  } else if (status === "closed") {
    tagBackground = "bg-cyan-500";
  } else if (status === "cancelled") {
    tagBackground = "bg-red-500";
  } else if (status === "in-progress") {
    tagBackground = "bg-green-400";
  } else {
    tagBackground = "bg-white";
  }
  return (
    <div
      className={`${tagBackground} text-center py-1 px-2 rounded-full font-bold uppercase text-neutral-800`}
    >
      {status}
    </div>
  );
};

export default StatusTag;
