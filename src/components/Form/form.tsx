import React from "react";
import useStore from "./useStore";

export interface FormProps {
  name?: string;
  children?: React.ReactNode;
  initialValues?: Record<string, any>;
}

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  "dispatch" | "fields"
> &
  Pick<FormProps, "initialValues">;

export const FormContext = React.createContext<IFormContext>(
  {} as IFormContext
);

const Form: React.FC<FormProps> = ({ name, children, initialValues}) => {
  const { fields, form, dispatch } = useStore();
  const passContext: IFormContext = {
    dispatch,
    fields,
    initialValues
  };
  return (
    <>
      <form name={name} className="viking-form">
        <FormContext.Provider value={passContext}>
          {children}
        </FormContext.Provider>
      </form>
      <div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  );
};

Form.defaultProps = {
  name: "viking_form",
};

export default Form;
