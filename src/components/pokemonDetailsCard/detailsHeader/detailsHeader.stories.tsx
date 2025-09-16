import type { Meta, StoryObj } from "@storybook/react";
import DetailsHeader from "./detailsHeader";

const meta: Meta<typeof DetailsHeader> = {
  title: "Components/DetailsHeader",
  component: DetailsHeader,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DetailsHeader>;

export const Default: Story = {
  args: {
    // TODO: Add sample props here
  },
};
