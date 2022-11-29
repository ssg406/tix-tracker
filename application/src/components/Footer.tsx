import { MdLogout, MdAdd, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "../context";

const Footer = () => {
  const { logoutUser } = useAppContext();
  return (
    <footer className="w-full h-13 bg-neutral-200 fixed bottom-0 left-0 p-3">
      <div className="md:container md:mx-auto h-full flex items-center justify-around">
        <button onClick={logoutUser}>
          <MdLogout className="text-2xl text-neutral-600" />
        </button>
        <Link to="new-ticket">
          <MdAdd className="text-2xl text-neutral-600" />
        </Link>
        <Link to="profile">
          <MdPerson className="text-2xl text-neutral-600" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
