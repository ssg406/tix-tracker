import React from "react";

const Button = ({ text, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-slate-500 px-4 py-3 rounded-md text-white font-bold font-heading"
    >
      {text}
    </button>
  );
};

export default Button;
