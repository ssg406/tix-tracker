import { Button, Alert } from "../../components";
import { useAppContext } from "../../context";
import React, { useState } from "react";
import DatePicker from "react-date-picker";

const initialFormValues = {
  date: "",
  description: "",
};

const NewTicket = () => {
  const { showAlert, createTicket } = useAppContext();

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket(formValues);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="p-4">
      <h2 className="text-xl font-bold tracking-tight mb-6">Create Ticket</h2>
      {showAlert && <Alert />}
      <form className="flex flex-col gap-4">
        <label className="font-medium" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          name="date"
          className="bg-neutral-200 ring-2 ring-neutral-300 px-4 py-2 rounded-tr-xl rounded-bl-xl focus:outline-0 focus:ring-neutral-400"
          onChange={handleChange}
        />
        <label className="font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          onChange={handleChange}
          id="description"
          name="description"
          rows="6"
          placeholder="Please enter a brief description of the issue"
          className="bg-neutral-200 rounded-tr-xl rounded-bl-xl ring-2 ring-neutral-300 focus:outline-0 focus:ring-neutral-400 px-4 py-2 resize-none"
        ></textarea>
        <Button text="Submit Ticket" handleClick={handleSubmit} />
      </form>
    </main>
  );
};

export default NewTicket;
