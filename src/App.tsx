import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu, { MenuModeEnum } from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

const App = () => {
  return (
    <>
      <Menu
        style={{
          width: '50px'
        }}
        mode={MenuModeEnum.vertical}
        defaultIndex={0}
        onSelect={console.log}
      >
        <MenuItem index={0}>1</MenuItem>
        <MenuItem index={1} disabled>
          2
        </MenuItem>
        <MenuItem index={2}>3</MenuItem>
      </Menu>
      <Menu
        defaultIndex={0}
        onSelect={console.log}
      >
        <MenuItem index={0}>1</MenuItem>
        <MenuItem index={1} disabled>
          2
        </MenuItem>
        <MenuItem index={2}>3</MenuItem>
      </Menu>
      <Button autoFocus>按钮</Button>
      <Button disabled>按钮</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
        按钮1 small
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        按钮1 small
      </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        按钮large
      </Button>

      <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
        链接
      </Button>
    </>
  );
};

export default App;
