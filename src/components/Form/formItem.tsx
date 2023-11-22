import classNames from "classnames";
import { useContext, useEffect } from "react";
import { FormContext } from "./form";
import React from "react";
import { CustomRule } from "./useStore";

export interface FormItemProps {
  name: string;
  label?: string;
  children?: React.ReactNode;
  valuePropName?: string;
  trigger?: string;
  rules?: CustomRule[];
  validateTrigger?: string;
  getValueFromEvent?: (event: any) => any;
}

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    name,
    label,
    children,
    valuePropName,
    trigger,
    rules,
    validateTrigger,
    getValueFromEvent,
  } = props as SomeRequired<
    FormItemProps,
    "getValueFromEvent" | "trigger" | "valuePropName" | "validateTrigger"
  >;
  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext);

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || "";
    dispatch({
      type: "addField",
      name,
      value: {
        label,
        name,
        value,
        rules: rules || [],
        errors: [],
        isValid: true,
      },
    });
  }, []);

  const rowClass = classNames("viking-row", {
    "viking-row-no-label": !label,
  });
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const errors = fieldState && fieldState.errors;
  const isRequired = rules?.some(
    (rule) => typeof rule !== "function" && rule.required
  );
  const hasError = errors && errors.length > 0;
  const labelCalss = classNames({
    "viking-form-item-required": isRequired,
  });

  const itemClass = classNames("viking-form-item-control", {
    "viking-form-item-has-error": hasError,
  });

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e);
    dispatch({
      type: "updateValue",
      name,
      value,
    });
  };

  const onValueValidate = async () => {
    await validateField(name);
  };

  const controlProps: Record<string, any> = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = onValueUpdate;

  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }

  const childList = React.Children.toArray(children);
  if (childList.length === 0) {
    console.error("no child element found in Form.Item, please provide");
  }
  if (childList.length > 1) {
    console.warn(
      "only support one child element in Form.Item, others will be omitted"
    );
  }
  if (!React.isValidElement(childList[0])) {
    console.error("child component is not a valid React Element");
  }
  const child = childList[0] as React.ReactElement;

  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  });
  return (
    <div className={rowClass}>
      {label && (
        <div className="viking-form-item-label">
          <label title={label} className={labelCalss}>
            {label}
          </label>
        </div>
      )}
      <div className="viking-form-item">
        <div className={itemClass}> {returnChildNode}</div>
        {hasError && (
          <div className="viking-form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: "value",
  trigger: "onChange",
  getValueFromEvent: (e) => e.target.value,
  validateTrigger: "onBlur",
};

export default FormItem;
