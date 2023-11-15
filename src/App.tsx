import React, { useRef, useState } from "react";

import Button from "./components/Button/button";
import SubMenu from "./components/Menu/subMenu";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import Transition from "./components/Transition/transition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Icon from "./components/Icon/icon";

const App = () => {
  const [show, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log(e.dataTransfer.files);
  };
  const handledropover = (e: React.DragEvent<HTMLDivElement>, flag: boolean) => {
    e.preventDefault()
    divRef.current!.style.backgroundColor = flag ? "blue" : "white";
  };
  return (
    <>
      <Icon icon={faCoffee} size="10x" theme="primary" />
      <FontAwesomeIcon icon={faCoffee} fontSize={50} />
      <Menu
        style={{
          margin: "20px",
        }}
        mode="vertical"
        defaultIndex={"0"}
        onSelect={console.log}
        defaultOpenSubMenus={["3"]}
      >
        <MenuItem index={"0"}>1</MenuItem>
        <MenuItem index={"1"} disabled>
          2
        </MenuItem>
        <MenuItem index={"2"}>3</MenuItem>
        <SubMenu index={"3"} title="更多">
          <MenuItem>333</MenuItem>
        </SubMenu>
      </Menu>
      <Menu defaultIndex={"0"} onSelect={console.log}>
        <MenuItem index={"0"}>1</MenuItem>
        <MenuItem index={"1"} disabled>
          2
        </MenuItem>
        <MenuItem index={"2"}>3</MenuItem>
        <SubMenu index={"3"} title="更多">
          <MenuItem>333</MenuItem>
        </SubMenu>
      </Menu>
      <Button autoFocus>按钮</Button>
      <Button disabled>按钮</Button>
      <Button btnType="danger" size="lg">
        按钮1 small
      </Button>
      <Button btnType="danger" size="lg">
        按钮1 small
      </Button>
      <Button btnType="danger" size="lg">
        按钮large
      </Button>

      <Button btnType="link" href="https://www.baidu.com" disabled>
        链接
      </Button>

      <Button onClick={() => setShow(!show)}>Toggle</Button>
      <Transition in={show} timeout={3000} animation="zoom-in-top">
        <div>
          <p>12312312313</p>
          <p>12312312313</p>
          <p>12312312313</p>
          <p>12312312313</p>
          <p>12312312313</p>
        </div>
      </Transition>
      <Transition in={show} timeout={300} animation="zoom-in-top">
        <Button btnType="primary" size="lg">
          1231231231313123123123
        </Button>
      </Transition>

      <div
        style={{
          width: "100vw",
          height: "200px",
          background: "red",
        }}
        ref={divRef}
        onDragOver={(e) => handledropover(e, true)}
        onDragLeave={(e) => handledropover(e, false)}
        onDrop={handleDrop}
      >
        111111111
      </div>
    </>
  );
};

export default App;
