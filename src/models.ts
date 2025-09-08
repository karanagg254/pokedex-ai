// Basic reusable types
export interface Pokemon {
  name: string;
  url: string;
}

export interface Ability {
  ability: Pokemon;
  is_hidden: boolean;
  slot: number;
}

export interface GameIndex {
  game_index: number;
  version: Pokemon;
}

export interface Move {
  move: Pokemon;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: Pokemon;
    version_group: Pokemon;
  }[];
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Pokemon;
}

export interface Type {
  slot: number;
  type: Pokemon;
}

export interface Sprite {
  front_default: string | null;
  back_default: string | null;
  front_shiny: string | null;
  back_shiny: string | null;
  // You can extend more fields from the API response if needed
  [key: string]: string | null;
}

export interface Cry {
  latest: string;
  legacy: string;
}

// The main Pokemon detail type
export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  location_area_encounters: string;

  abilities: Ability[];
  forms: Pokemon[];
  game_indices: GameIndex[];
  held_items: any[]; // refine later if you need
  moves: Move[];
  past_abilities: Ability[];
  past_types: Type[];
  species: Pokemon;
  sprites: Sprite;
  stats: Stat[];
  cries: Cry;
}

// Define the type for your global state
export interface PokemonState {
  pokemonsList: PokemonDetail[];
  allPokemonsList: Pokemon[];
  pokemonSelectedId: number | null;
  pokemonData: any | null; // You can replace `any` with a proper type later
  isLoading: boolean;
  isLoadMoreInprogress: boolean;
  pokemonsTypes: { label: string; value: string; url: string }[];
  pokemonGenderList: { label: string; value: string; url: string }[];
}

export enum ActionTypes {
  SET_POKEMON_LIST = "ACTIONS.SET_POKEMON_LIST",
  SET_ALL_POKEMON_LIST = "ACTIONS.SET_ALL_POKEMON_LIST",
  SET_FILTERED_POKEMON_LIST = "ACTIONS.SET_FILTERED_POKEMON_LIST",
  SET_POKEMON_TYPE = "ACTIONS.SET_POKEMON_TYPE",
  SET_POKEMON_GENDER_LIST = "ACTIONS.SET_POKEMON_GENDER_LIST",
  SET_API_CALL_INPROGRESS = "ACTIONS.SET_API_CALL_INPROGRESS",
  SET_LOAD_MORE_API_CALL_INPROGRESS = "ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS",
  SET_POKEMON_BY_ID = "ACTIONS.SET_POKEMON_BY_ID",
  RESET_POKEMON_DATA = "ACTIONS.RESET_POKEMON_DATA",
  SET_POKEMON_ID = "ACTIONS.SET_POKEMON_ID",
}

// 2. Action interfaces
export interface SetPokemonListAction {
  type: ActionTypes.SET_POKEMON_LIST;
  payload: PokemonDetail[];
}

export interface SetAllPokemonListAction {
  type: ActionTypes.SET_ALL_POKEMON_LIST;
  payload: Pokemon[];
}

export interface SetFilteredPokemonListAction {
  type: ActionTypes.SET_FILTERED_POKEMON_LIST;
  payload: PokemonDetail[];
}

export interface SetPokemonTypeAction {
  type: ActionTypes.SET_POKEMON_TYPE;
  payload: { label: string; value: string; url: string }[];
}

export interface SetPokemonGenderListAction {
  type: ActionTypes.SET_POKEMON_GENDER_LIST;
  payload: { label: string; value: string; url: string }[];
}

export interface SetApiCallInProgressAction {
  type: ActionTypes.SET_API_CALL_INPROGRESS;
  payload: boolean;
}

export interface SetLoadMoreApiCallInProgressAction {
  type: ActionTypes.SET_LOAD_MORE_API_CALL_INPROGRESS;
  payload: boolean;
}

export interface SetPokemonByIdAction {
  type: ActionTypes.SET_POKEMON_BY_ID;
  payload: PokemonDetail | null;
}

export interface ResetPokemonDataAction {
  type: ActionTypes.RESET_POKEMON_DATA;
}

export interface SetPokemonIdAction {
  type: ActionTypes.SET_POKEMON_ID;
  payload: number | null;
}

// 3. Union of all actions
export type PokemonAction =
  | SetPokemonListAction
  | SetAllPokemonListAction
  | SetFilteredPokemonListAction
  | SetPokemonTypeAction
  | SetPokemonGenderListAction
  | SetApiCallInProgressAction
  | SetLoadMoreApiCallInProgressAction
  | SetPokemonByIdAction
  | ResetPokemonDataAction
  | SetPokemonIdAction;
