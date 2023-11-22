import React from "react";
import useStore, { FormState } from "./useStore";

export interface FormProps {
  name?: string;
  children?: React.ReactNode;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (
    values: Record<string, any>,
    errors: FormState["errors"]
  ) => void;
}

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  "dispatch" | "fields" | "validateField"
> &
  Pick<FormProps, "initialValues">;

export const FormContext = React.createContext<IFormContext>(
  {} as IFormContext
);

const Form: React.FC<FormProps> = ({
  name,
  children,
  initialValues,
  onFinish,
  onFinishFailed,
}) => {
  const { fields, form, dispatch, validateField, validateAllField } =
    useStore();
  const passContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllField();
    if (isValid) {
      onFinish && onFinish(values);
    } else {
      onFinishFailed && onFinishFailed(values, errors);
    }
  };

  return (
    <>
      <form name={name} className="viking-form" onSubmit={submitForm}>
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
