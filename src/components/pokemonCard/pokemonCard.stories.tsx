import type { Meta, StoryObj } from "@storybook/react";
import PokemonCard from "./pokemonCard";

const meta: Meta<typeof PokemonCard> = {
  title: "Components/PokemonCard",
  component: PokemonCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof PokemonCard>;

export const Default: Story = {
  args: {
    // TODO: Add sample props here
  },
};
