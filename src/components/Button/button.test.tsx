import { render } from "@testing-library/react";
import Button from "./button";

// test('test button component case', () => {
//     const wrapper = render(<Button>nice</Button>)
//     const element = wrapper.queryByText('nice')
//     expect(element).toBeTruthy()
// })

describe("test button component", () => {
  it("渲染正确的默认button", () => {
    const wrapper = render(<Button>nice</Button>);
    const element = wrapper.getByText("nice");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON")
    expect(element).toHaveClass('btn btn-default')
  });
  it("渲染不同的参数button", () => {});
  it("渲染link", () => {});
  it("渲染禁用button", () => {});
});
