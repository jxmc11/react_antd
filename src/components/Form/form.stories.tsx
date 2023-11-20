import { Meta, StoryObj } from "@storybook/react";
import Form from "./form";
import Item from "./formItem";
import Input from "../Input/input";

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const BaseForm: Story = {
  render: () => (
    <Form initialValues={{
        username: 'jwq',
        rember: true
    }}>
      <Item name="username" label="用户名">
        <Input />
      </Item>
      <Item name="password" label="密码">
        <Input />
      </Item>
      <Item name="rember" valuePropName="checked" getValueFromEvent={(e) => e.target.checked}>
        <input type="checkbox" />
      </Item>
    </Form>
  ),
};
