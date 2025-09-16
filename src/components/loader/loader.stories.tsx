import type { Meta, StoryObj } from "@storybook/react";
import Loader from "./loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    // TODO: Add sample props here
  },
};
