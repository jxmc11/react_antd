import Button, { ButtonSize, ButtonType } from "./components/Button/button";

const App = () => {
  return (
    <>
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
