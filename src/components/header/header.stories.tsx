import type { Meta, StoryObj } from "@storybook/react";
import Header from "./header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"], // Storybook Docs auto-generation
  argTypes: {
    className: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Default story
export const Default: Story = {
  args: {
    children: "Pokédex Header",
    className: "header-container",
  },
};

// Another variant
export const WithCustomClass: Story = {
  args: {
    children: "Header with Custom Class",
    className: "custom-header",
  },
};
