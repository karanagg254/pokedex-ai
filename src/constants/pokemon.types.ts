import { FlavorTextEntry } from "../models";

// -------------------------------
// Pokémon core type definitions
// -------------------------------

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url?: string;
  };
  is_hidden?: boolean;
  slot?: number;
}

export interface PokemonType {
  type: {
    name: string;
    url?: string;
  };
}

export interface EggGroup {
  name: string;
  url?: string;
}

export interface SpeciesData {
  egg_groups: EggGroup[];
}

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
}

// Damage relations (for Weak Against in PropertyCard)
export interface DamageRelations {
  double_damage_from: { name: string; url?: string }[];
}

export interface PokemonTypeData {
  damage_relations: DamageRelations;
}

// -------------------------------
// Existing constants & helpers
// -------------------------------

export const POKEMON_TYPE = Object.freeze({
  normal: {
    color: "#DDCBD0",
    hex: "",
  },
  fighting: {
    color: "#FCC1B0",
    hex: "",
  },
  flying: {
    color: "#B2D2E8",
    hex: "",
  },
  poison: {
    color: "#CFB7ED",
    hex: "",
  },
  ground: {
    color: "#F4D1A6",
    hex: "",
  },
  rock: {
    color: "#C5AEA8",
    hex: "",
  },
  bug: {
    color: "#C1E0C8",
    hex: "",
  },
  ghost: {
    color: "#D7C2D7",
    hex: "",
  },
  steel: {
    color: "#C2D4CE",
    hex: "",
  },
  fire: {
    color: "#EDC2C4",
    hex: "",
  },
  water: {
    color: "#CBD5ED",
    hex: "",
  },
  grass: {
    color: "#C0D4C8",
    hex: "",
  },
  electric: {
    color: "#E2E2A0",
    hex: "",
  },
  psychic: {
    color: "#DDC0CF",
    hex: "",
  },
  ice: {
    color: "#C7D7DF",
    hex: "",
  },
  dragon: {
    color: "#CADCDF",
    hex: "",
  },
  dark: {
    color: "#C6C5E3",
    hex: "",
  },
  fairy: {
    color: "#E4C0CF",
    hex: "",
  },
  unknown: {
    color: "#C0DFDD",
    hex: "",
  },
  shadow: {
    color: "#CACACA",
    hex: "",
  },
});

export const getPokcolor = (type: string): string => {
  return POKEMON_TYPE[type as keyof typeof POKEMON_TYPE]
    ? POKEMON_TYPE[type as keyof typeof POKEMON_TYPE].color
    : POKEMON_TYPE["unknown"].color;
};

export const getBackground = (pokemonTypes?: PokemonType[]): string => {
  let color = "";
  if (pokemonTypes?.length) {
    const {
      type: { name: pokemontype1 },
    } = pokemonTypes && pokemonTypes[0];

    if (pokemonTypes?.length > 1) {
      const {
        type: { name: pokemontype2 },
      } = pokemonTypes && pokemonTypes[1];
      color = `linear-gradient(180deg, ${getPokcolor(
        pokemontype1
      )} 0%, ${getPokcolor(pokemontype2)} 100%)`;
    } else {
      color = getPokcolor(pokemontype1);
    }
  }
  return color;
};

export const getPokemonDescription = (data: FlavorTextEntry[]): string => {
  if (data.length) {
    const uniqueTextArray: string[] = [];
    return data.reduce((acc, next) => {
      if (
        next.language.name === "en" &&
        !uniqueTextArray.includes(next.flavor_text)
      ) {
        uniqueTextArray.push(next.flavor_text);
        return (acc += next.flavor_text.replace(/\n|\f/g, " "));
      }
      return acc;
    }, "");
  }
  return "";
};

export const getCamleCaseString = (str = ""): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
