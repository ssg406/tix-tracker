import { Button, Alert } from "../../components";
import { useAppContext } from "../../context";
// State will need to track of ticket is being edited and populate form accordingly

const NewTicket = () => {
  const { showAlert } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="p-4">
      <h2 className="text-xl font-bold tracking-tight mb-6">Create Ticket</h2>
      {showAlert && <Alert />}
      <form className="flex flex-col gap-4">
        <label className="font-medium" htmlFor="description">
          Description
        </label>
        <textarea
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
