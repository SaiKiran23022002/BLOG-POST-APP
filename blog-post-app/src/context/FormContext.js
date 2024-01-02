import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    title: "",
    category: "",
    content: "",
  });

  const updateFormState = (newState) => {
    setFormState({ ...formState, ...newState });
  };

  return (
    <FormContext.Provider value={{ formState, updateFormState }}>
      {children}
    </FormContext.Provider>
  );
};
