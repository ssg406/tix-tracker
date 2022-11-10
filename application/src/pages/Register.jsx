import { useState } from "react";
import Logo from "../assets/logo_svg.svg";
import { TextInput } from "../components";

const formValues = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  isMember: false,
};

const Register = () => {
  const [formState, setFormState] = useState(formValues);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formState.isMember) {
      // Login
    } else {
      // Register
    }

    // Clear values at end
    setFormState(formValues);
  };

  const toggleForm = () => {
    setFormState({ ...formState, isMember: !formState.isMember });
  };

  return (
    <div className="md:container md:mx-auto p-4 flex flex-col gap-6 items-center">
      <img className="h-14 md:h-24" src={Logo} alt="trakr logo" />
      <h2 className="text-xl font-bold tracking-tight">Create Account</h2>
      <form className="w-full p-2 flex flex-col gap-6">
        {!formState.isMember && (
          <TextInput
            name="name"
            value={formState.name}
            type="text"
            handleChange={handleChange}
          />
        )}
        <TextInput
          name="email"
          type="email"
          value={formState.email}
          handleChange={handleChange}
        />
        <TextInput
          name="password"
          type="password"
          value={formState.password}
          handleChange={handleChange}
        />
        {!formState.isMember && (
          <TextInput
            name="confirm"
            type="password"
            value={formState.confirm}
            handleChange={handleChange}
          />
        )}
        <button
          className="bg-slate-500 focus:bg-slate-800 px-6 py-2 rounded-md font-medium text-white"
          type="submit"
          onClick={handleSubmit}
        >
          {formState.isMember ? "Login" : "Register"}
        </button>
      </form>
      <p className="">
        {formState.isMember ? "No account yet? " : "Registered already? "}
        <button onClick={toggleForm} className="font-bold text-slate-700">
          {formState.isMember ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Register;
