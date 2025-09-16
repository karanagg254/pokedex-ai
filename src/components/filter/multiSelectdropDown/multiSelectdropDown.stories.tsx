import type { Meta, StoryObj } from "@storybook/react";
import MultiSelectdropDown from "./multiSelectdropDown";

const meta: Meta<typeof MultiSelectdropDown> = {
  title: "Components/MultiSelectdropDown",
  component: MultiSelectdropDown,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof MultiSelectdropDown>;

export const Default: Story = {
  args: {
    // TODO: Add sample props here
  },
};
