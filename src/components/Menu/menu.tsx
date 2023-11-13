import classNames from "classnames";
import React, { createContext, useState } from "react";

export const enum MenuModeEnum {
  "horizontal" = "horizontal",
  "vertical" = "vertical",
}

type MenuMode = MenuModeEnum.horizontal | MenuModeEnum.vertical;

type SelectCallBack = (selectIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  classname?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
  children?: React.ReactNode;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallBack;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = ({
  classname,
  mode,
  style,
  children,
  defaultIndex,
  onSelect,
}) => {
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const classes = classNames("viking-menu", classname, {
    "menu-vertical": mode === MenuModeEnum.vertical,
  });

  const handleClick = (index: number) => {
    setCurrentActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: MenuModeEnum.horizontal,
};

export default Menu;
