import Logo from "../assets/logo_svg.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex justify-center flex-col h-screen">
      <div className="self-center p-6">
        <img className="h-14" src={Logo} alt="Trakr logo" />
      </div>
      <div className="bg-neutral-900 p-6">
        <h1 className="text-5xl font-medium text-white">404</h1>
        <p className="text-neutral-200 text-sm mt-2">
          That page doesn't seem to exist.
        </p>
        <Link className="text-sky-300 font-bold text-sm" to="/">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Error;
