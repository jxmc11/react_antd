import classNames from "classnames";
import React, { createContext, useState } from "react";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";

type SelectCallBack = (selectIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  classname?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  defaultOpenSubMenus?: string[];
  onSelect?: SelectCallBack;
  children?: React.ReactNode;
}

interface IMenuContext {
  index: string;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
  onSelect?: SelectCallBack;
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = ({
  classname,
  mode,
  style,
  children,
  defaultIndex,
  defaultOpenSubMenus,
  onSelect,
}) => {
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const classes = classNames("viking-menu", classname, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setCurrentActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childeElement =
        child as React.FunctionComponentElement<MenuItemProps>;

      const { displayName } = childeElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childeElement, {
          index: index.toString(),
        });
      } else {
        console.warn(
          "Warring: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
