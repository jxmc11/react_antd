import { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  render: () => <Button>default</Button>,
};

export const Primary: Story = {
  render: () => <Button btnType="primary">primary</Button>,
};
