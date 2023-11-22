import { Meta, StoryObj } from "@storybook/react";
import Form from "./form";
import Item from "./formItem";
import Input from "../Input/input";
import { CustomRule } from "./useStore";
import Button from "../Button/button";

const meta: Meta<typeof Form> = {
  component: Form,
  argTypes: {
    onFinishFailed: console.log,
    onFinish: console.log
  }
};

export default meta;

type Story = StoryObj<typeof Form>;

const confirmRules: CustomRule[] = [
  { type: "string", required: true, max: 8, min: 5 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      console.log("the value", getFieldValue("password"));
      console.log(value);
      if (value !== getFieldValue("password")) {
        return Promise.reject("密码不一致");
      }
      return Promise.resolve();
    },
  }),
];

export const BaseForm: Story = {
  render: (args) => (
    <Form
      initialValues={{
        username: "jwq",
        rember: false,
      }}
      {
        ...args
      }
    >
      <Item
        name="username"
        label="用户名"
        rules={[
          {
            type: "email",
            required: true,
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        name="password"
        label="密码"
        rules={[
          {
            type: "string",
            required: true,
            max: 8,
            min: 5,
          },
        ]}
      >
        <Input />
      </Item>
      <Item name="password2" label="重复密码" rules={confirmRules}>
        <Input />
      </Item>
      <Item
        name="rember"
        valuePropName="checked"
        getValueFromEvent={(e) => e.target.checked}
        rules={[{
          type: 'enum',
          enum: [true],
          message: '请勾选'
        }]}
      >
        <input type="checkbox" />
      </Item>
      <div style={{
        textAlign: 'center'
      }}>
      <Button btnType='primary' type='submit'>提交</Button>
      </div>
    </Form>
  ),
};
