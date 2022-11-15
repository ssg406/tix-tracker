import React, { useState } from "react";
import { TextInput, Button, Alert } from "../../components";
import { useAppContext } from "../../context";

const Profile = () => {
  const { user, showAlert, updateUser } = useAppContext();
  const profileFormValues = {
    name: user.name,
    email: user.email,
  };
  const [formValues, setFormValues] = useState(profileFormValues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formValues);
  };
  return (
    <main className="p-4">
      <h2 className="text-xl font-bold tracking-tight mb-6">
        Account Information
      </h2>
      {showAlert && <Alert />}
      <form className="flex flex-col gap-6">
        <TextInput
          name="name"
          type="text"
          handleChange={handleChange}
          value={formValues.name}
        />
        <TextInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={formValues.email}
        />
        <Button text="Save Changes" handleClick={handleSubmit} />
      </form>
    </main>
  );
};

export default Profile;
