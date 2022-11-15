import React from "react";
import { useAppContext } from "../context";

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  const alertStyleClass =
    alertType === "danger"
      ? "bg-red-300 ring-red-400"
      : "bg-green-300 ring-green-400";
  return (
    // Conditionally apply background and ring color
    <div
      className={`py-4 px-6 my-4 ring-2 rounded-md tracking-tight font-medium ${alertStyleClass}`}
    >
      <p className="text-center">{alertText}</p>
    </div>
  );
};

export default Alert;
