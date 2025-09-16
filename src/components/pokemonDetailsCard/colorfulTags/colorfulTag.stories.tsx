import type { Meta, StoryObj } from "@storybook/react";
import ColorfulTag from "./colorfulTag";

const meta: Meta<typeof ColorfulTag> = {
  title: "Components/ColorfulTag",
  component: ColorfulTag,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ColorfulTag>;

export const Default: Story = {
  args: {
    // TODO: Add sample props here
  },
};
