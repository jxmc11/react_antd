import classNames from "classnames";
import { useContext, useEffect } from "react";
import { FormContext } from "./form";
import React from "react";

export interface FormItemProps {
  name: string;
  label?: string;
  children?: React.ReactNode;
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (event: any) => any;
}

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

const FormItem: React.FC<
  SomeRequired<FormItemProps, "getValueFromEvent" | "trigger" | "valuePropName">
> = ({ name, label, children, valuePropName, trigger, getValueFromEvent }) => {
  const { dispatch, fields, initialValues } = useContext(FormContext);
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || "";
    dispatch({
      type: "addField",
      name,
      value: {
        label,
        name,
        value,
      },
    });
  }, []);

  const rowClass = classNames("viking-row", {
    "viking-row-no-label": !label,
  });
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e);
    dispatch({
      type: "updateValue",
      name,
      value,
    });
  };
  const controlProps: Record<string, any> = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = onValueUpdate;

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
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="viking-form-item">{returnChildNode}</div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: "value",
  trigger: "onChange",
  getValueFromEvent: (e) => e.target.value,
};

export default FormItem;
