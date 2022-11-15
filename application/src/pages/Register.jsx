import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo_svg.svg";
import { TextInput, Alert } from "../components";
import { useAppContext } from "../context";

const formValues = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  isMember: false,
};

const Register = () => {
  const [formState, setFormState] = useState(formValues);
  const { isLoading, showAlert, registerUser, user } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formState.isMember) {
      registerUser({
        formState,
        endpoint: "login",
        alertText: "Signed in successfully!",
      });
      setFormState({
        ...formState,
        password: "",
      });
    } else {
      registerUser({
        formState,
        endpoint: "register",
        alertText: "User registered successfully!",
      });
      setFormState({
        ...formState,
        password: "",
        confirm: "",
      });
    }
  };

  const toggleForm = () => {
    setFormState({ ...formState, isMember: !formState.isMember });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="md:container md:mx-auto md:max-w-lg p-4 flex flex-col gap-6 items-center justify-center  h-screen">
      <img className="h-16 md:h-24" src={Logo} alt="trakr logo" />
      <h2 className="text-xl font-bold tracking-tight">
        {formState.isMember ? "Login" : "Create Account"}
      </h2>
      {showAlert && <Alert />}
      <form className="w-full p-2 flex flex-col gap-6 md:p-8 md:bg-slate-100 md:rounded-xl">
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
          disabled={isLoading}
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
