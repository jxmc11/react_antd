import React, { useContext, useState } from "react";
import { MenuContext } from "./menu";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}
const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children,
}) => {
  const context = useContext(MenuContext);

  const openSubMenus = context.defaultOpenSubMenus as Array<string>;

  const isOpened =
    index && context.mode === "vertical" ? openSubMenus.includes(index) : false;

  const [open, setOpen] = useState(isOpened);

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": open,
    "is-vertical": context.mode === "vertical",
  });

  const hanldeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
  };

  const hanldeHover = {
    onMouseEnter: (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(true);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(false);
    },
  };

  const subMenuShowEvent = {
    clik: {
      onClick: context.mode !== "horizontal" ? hanldeClick : undefined,
    },
    hover: {
      onMouseEnter:
        context.mode === "horizontal" ? hanldeHover.onMouseEnter : undefined,
      onMouseLeave:
        context.mode === "horizontal" ? hanldeHover.onMouseLeave : undefined,
    },
  };

  const renderChildren = () => {
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened": open,
    });

    const childeComponents = React.Children.map(children, (child, i) => {
      const childeElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (childeElement.type.displayName === "MenuItem") {
        return React.cloneElement(childeElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.warn(
          "Warring: SubMenu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition
        in={open}
        animation="zoom-in-top"
        timeout={300}
      >
        <ul className={subMenuClasses}>{childeComponents}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...subMenuShowEvent.hover}>
      <div className="submenu-title" {...subMenuShowEvent.clik}>
        {title}
        <Icon icon={faAngleDown} className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
