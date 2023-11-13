import classNames from "classnames";
import React, { useContext } from "react";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  index,
  disabled,
  className,
  style,
  children,
}) => {
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    context.onSelect && !disabled && context.onSelect(index);
  };

  return (
    <li
      data-index={index}
      className={classes}
      style={style}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

export default MenuItem;
