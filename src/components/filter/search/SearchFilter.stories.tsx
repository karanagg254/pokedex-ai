import type { Meta, StoryObj } from "@storybook/react";
import SearchFilter from "./SearchFilter";

const meta: Meta<typeof SearchFilter> = {
  title: "Components/Search.filter",
  component: SearchFilter,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {
  args: {
    // TODO: Add sample props here
  },
};
