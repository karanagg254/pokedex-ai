// import * as ACTIONS from "../../store/actions/pokemonAction";
import { ActionTypes, PokemonAction, PokemonState } from "../../models";

export const initialState: PokemonState = {
  pokemonsList: [],
  allPokemonsList: [],
  pokemonSelectedId: null,
  pokemonData: null,
  isLoading: true,
  isLoadMoreInprogress: false,
  pokemonsTypes: [],
  pokemonGenderList: [],
};

export const reducer = (
  state: PokemonState,
  action: PokemonAction
): PokemonState => {
  switch (action.type) {
    case ActionTypes.SET_POKEMON_LIST:
      return {
        ...state,
        pokemonsList: [...state.pokemonsList, ...action.payload],
      };

    case ActionTypes.SET_ALL_POKEMON_LIST:
      return {
        ...state,
        allPokemonsList: action.payload,
      };

    case ActionTypes.SET_FILTERED_POKEMON_LIST:
      return {
        ...state,
        pokemonsList: action.payload,
      };

    case ActionTypes.SET_POKEMON_TYPE:
      return {
        ...state,
        pokemonsTypes: action.payload,
      };

    case ActionTypes.SET_POKEMON_GENDER_LIST:
      return {
        ...state,
        pokemonGenderList: action.payload,
      };

    case ActionTypes.SET_API_CALL_INPROGRESS:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ActionTypes.SET_LOAD_MORE_API_CALL_INPROGRESS:
      return {
        ...state,
        isLoadMoreInprogress: action.payload,
      };

    case ActionTypes.SET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonData: action.payload,
      };

    case ActionTypes.RESET_POKEMON_DATA:
      return {
        ...state,
        pokemonData: null,
      };

    case ActionTypes.SET_POKEMON_ID:
      return {
        ...state,
        pokemonSelectedId: action.payload,
      };

    default:
      return state;
  }
};
