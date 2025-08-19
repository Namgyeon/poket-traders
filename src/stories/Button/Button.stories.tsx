import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/ui/Button/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive"],
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary: StoryObj<typeof meta> = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: StoryObj<typeof meta> = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};
