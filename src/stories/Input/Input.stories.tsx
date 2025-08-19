import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/ui/Input/Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
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
