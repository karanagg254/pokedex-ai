import type { Meta, StoryObj } from "@storybook/react";
import PropertyCard from "./propertyCard";

const meta: Meta<typeof PropertyCard> = {
  title: "Components/PropertyCard",
  component: PropertyCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof PropertyCard>;

export const Default: Story = {
  args: {
    // TODO: Add sample props here
  },
};
