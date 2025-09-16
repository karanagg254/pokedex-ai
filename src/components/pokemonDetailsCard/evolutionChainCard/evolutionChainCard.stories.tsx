import type { Meta, StoryObj } from "@storybook/react";
import EvolutionChainCard from "./evolutionChainCard";

const meta: Meta<typeof EvolutionChainCard> = {
  title: "Components/EvolutionChainCard",
  component: EvolutionChainCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof EvolutionChainCard>;

export const Default: Story = {
  args: {
    // TODO: Add sample props here
  },
};
