const TextInput = ({ name, type, handleChange, value }) => {
  return (
    <div className="flex flex-col">
      <label className="capitalize font-medium" htmlFor={name}>
        {name}
      </label>
      <input
        className="border-b-2 focus:outline-0 px-4 py-2 border-neutral-800 focus:bg-neutral-200 focus:rounded-t-md bg-transparent"
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextInput;
