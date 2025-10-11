import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PasswordInput from "@/components/ui/Input/PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "UI/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "boolean",
    },
    value: {
      control: "text",
    },
    label: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "password" },
};

export const WithLabel: Story = {
  args: {
    label: "Label",
  },
};

export const WithLabelAndError: Story = {
  args: {
    label: "Label",
    error: true,
    errorMessage: "Error Message",
  },
};

export const WithValue: Story = {
  args: {
    label: "Password",
    value: "short",
  },
};

export const WithValueAndError: Story = {
  args: {
    label: "Password",
    value: "short",
    error: true,
    errorMessage: "Password must be at least 8 characters",
  },
};
